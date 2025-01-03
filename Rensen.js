const Rensen = (() => {
    class Rensen {
        static watchers = new Map();
        static inputs = new Map();
        static stack = [];
        static instances = new Map();
        static nextId = 1;
        constructor(compute) {
            this.id = Rensen.nextId++;
            Rensen.instances.set(this.id, this);
            this.compute = compute;
            this.value = undefined;
            this.recompute();
        }
        get() {
            if (Rensen.stack.length > 0) {
                const current = Rensen.stack[Rensen.stack.length - 1];
                if (!Rensen.watchers.has(this.id)) {
                    Rensen.watchers.set(this.id, []);
                }
                Rensen.watchers.get(this.id).push(current.id);
                if (!Rensen.inputs.has(current.id)) {
                    Rensen.inputs.set(current.id, []);
                }
                Rensen.inputs.get(current.id).push(this.id);
            }
            return this.value;
        }
        set(newCompute) {
            this.compute = newCompute;
            this.recompute();
        }
        clearDependencies() {
            if (Rensen.inputs.has(this.id)) {
                const inputIds = Rensen.inputs.get(this.id);
                inputIds.forEach((inputId) => {
                    if (Rensen.watchers.has(inputId)) {
                        const watchersForInput = Rensen.watchers.get(inputId);
                        Rensen.watchers.set(
                            inputId,
                            watchersForInput.filter((watcherId) => watcherId !== this.id)
                        );
                    }
                });
                Rensen.inputs.delete(this.id);
            }
        }
        recompute() {
            this.clearDependencies();
            Rensen.stack.push(this);

            const newValue = this.compute ? this.compute() : undefined;
            if (newValue !== this.value) {
                this.value = newValue;
                this.notifyWatchers();
            }

            Rensen.stack.pop();
        }
        notifyWatchers() {
            if (Rensen.watchers.has(this.id)) {
                const watchersList = Rensen.watchers.get(this.id);
                watchersList.forEach((watcherId) => {
                    const watcherObj = Rensen.instances.get(watcherId);
                    if (watcherObj) {
                        watcherObj.recompute();
                    }
                });
            }
        }
        static R(compute) {
            const core = new Rensen(compute);

            function reactive(...args) {
                if (args.length > 0) {

                    core.set(args[0]);
                } else {

                    return core.get();
                }
            }
            reactive.__core = core;
            return reactive;
        }

        static destroy(reactive) {
            if (!reactive.__core) return;
            const core = reactive.__core;
            Rensen.watchers.delete(core.id);
            Rensen.inputs.delete(core.id);
            Rensen.instances.delete(core.id);
            core.compute = null;
            core.value = null;
        }
    }
    return Rensen;
})();
const R = (c) => Rensen.R(c);