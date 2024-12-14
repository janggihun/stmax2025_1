class JudgeHighlightPool {
    constructor(initialSize, dom) {
        this.pool = [];
        this.dom = dom;
        this.maxSize = initialSize;
        this.index = 0;
        this.createInitialPool(initialSize);

    }

    createInitialPool(count) {
        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            div.classList.add("Game_JudgeSlowFastBeam");
            this.pool.push(div);
            this.dom.appendChild(div);
        }
    }

    get() {
        const div = this.pool[this.index];
        this.index++;
        if (this.index == this.maxSize) this.index = 0;

        div.classList.remove('flash');
        div.style.opacity = '0.9';
        void div.offsetWidth;

        div.classList.add('flash');
        div.style.opacity = '0';

        return div;
    }
}

export default JudgeHighlightPool;