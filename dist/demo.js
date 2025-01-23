/**
 * Random position generator ...
 *
 * @return {{top: *, left: *, bottom: *, right: *}}
 */

function generateRandomPosition() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        top: getRandomInt(-400, 400),
        left: getRandomInt(-400, 400),
        bottom: getRandomInt(-400, 400),
        right: getRandomInt(-400, 400)
    };
}

/**
 * Generates a guid
 *
 * @returns {string}
 */

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    });
};


let modalManager = null;

document.addEventListener('DOMContentLoaded', function () {


    modalManager = new LayeredModalManager({

        baseShiftDistance: {
            top: 0,
            left: 0,
        },
        hideXButton: 0,
        cssClass: {
            modalClose: 'damn-modal'
        },
        zIndex: 1,
        transitionDuration: 100,
    });

    let embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/IzQ3gFRj0Bc?si=ezVQJ1aTV2P-NkPE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

    document.getElementById('openVideoModal').addEventListener('click', () => {
        modalManager.addModal({
            userSelect: false,
            draggable: false,
            dragHandle: ``,
            body: {
                noPadding: true,
                aspectRatio: 16 / 9
            },
            /*transitionDuration : 100,*/
            header: {
                enabled: 0,
                content: `<h3>The big lie about nuclear waste</h3>`
            },
            content: embedCode,
            footer: {
                enabled: 0,
                content: `<div class="d-flex fd-row jc-center gap-3">
<button class='damn-modal lm-btn lm-btn-warning'>Close 33</button>
<button class='damn-modal lm-btn lm-btn-success'>Close 33</button>
<button class='damn-modal lm-btn lm-btn-info'>Close 33</button>
</div>`,
                mode: 'custom',
                onOk: function () {
                    console.log('%c%s', 'background-color: green;color: #fff;font-size: 1.2em;padding: 1em;', `Is ok?`);
                    this.hide();
                }
            },
            onShow: function () {

                /*let pos = generateRandomPosition();

                this.adjustMargin(pos);*/

                console.log('Shown');

                console.log(this.getParams().shiftDistance);

            },
            onHide: function () {

                console.log('Hidden');

            },

            width: {
                value: 800,
                unit: 'px'
            }

        });
    });


    // Add a modal
    document.getElementById('openModal').addEventListener('click', () => {

        let dragId = guid();

        modalManager.addModal({
            cssClass : {
                modal : 'rounded',
                modalClose: 'damn-modal'
            },
            userSelect: false,
            draggable: false,
            dragHandle: ``,
            /*transitionDuration : 100,*/
            header: {
                enabled: 1,
                title: `<span class="text-info">Modal Title 2 @ ${new Date}</span>`,
                titleTag : 'h4',
            },
            content: `<div><p>This is a modal content.<div id='drag-me-${dragId}'>Click and drag!</div> <button class="move-btn">✥</button>
</p></div>`,
            footer: {
                enabled: 1,
                content: `<div class="d-flex fd-row jc-center gap-3">
<button class='damn-modal lm-btn lm-btn-warning'>Close 33</button>
<button class='damn-modal lm-btn lm-btn-success'>Close 33</button>
<button class='damn-modal lm-btn lm-btn-info'>Close 33</button>
</div>`,
                mode: 'custom',
                onOk: function () {
                    console.log('%c%s', 'background-color: green;color: #fff;font-size: 1.2em;padding: 1em;', `Is ok?`);
                    this.hide();
                }
            },
            onShow: function () {

                /*let pos = generateRandomPosition();

                this.adjustMargin(pos);*/

                console.log('Shown');

                console.log(this.getParams().shiftDistance);

            },
            onHide: function () {

                console.log('Hidden');

            },


        });
    });

    // Remove top modal
    document.getElementById('closeModal').addEventListener('click', () => {
        modalManager.removeModal(() => {
            //console.log('Stack Size: ', modalManager.stackSize());
        });
    });

    function getDataAttributes(element) {
        let dataAttrs = {};

        if (!(element instanceof HTMLElement)) {
            console.error('element is not an instance of HTMLElement');
            return dataAttrs;
        }

        [...element.attributes].forEach(attr => {
            if (attr.name.startsWith("data-")) {
                let key = attr.name.slice(5); // Remove "data-" prefix
                dataAttrs[key] = attr.value;
            }
        });

        return dataAttrs;
    }


    // openModalViaData

    /*document.getElementById('openModalViaData').addEventListener('click', (e) => {


        let attrs = getDataAttributes(e.target.closest('button'));

        console.log(attrs);

        return false;
    });*/


});

function __mc_content(args) {

    try {

        let obj = JSON.parse(args);

        return `${obj.name} (${obj.age}M) had a little lamb ....: ${args}`;

    } catch (error) {
        return 'Invalid JSON data ...' + args;
    }


}