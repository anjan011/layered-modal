if(typeof LayeredModalSystem === 'undefined') {
    throw new Error('LayeredModalSystem cannot be found');
}

const LMS = LayeredModalSystem;
const LayeredModalManager = LMS.ModalManager;
const LayeredModal = LMS.Modal;

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


let modalManager = null;

document.addEventListener('DOMContentLoaded', function () {


    modalManager = new LayeredModalManager({

        baseShiftDistance: {
            top: 100,
            left: 0,
        },
        hideXButton: 0,
        cssClass: {
            modalClose: 'damn-modal'
        },
        zIndex: 1,
        transitionDuration: 100,
        /*xButton: {
            enabled: true,
            content: `<i class="fa fa-fw fa-stop icon"></i> Close MM`,
            cssClass: 'large-button',
            inlineStyles: 'font-size: 30px;padding: 30px;background-color: marron !important;'
        },*/
    });

    let ytUrl1 = 'https://www.youtube.com/watch?v=ShJw2I8cgBE';
    let ytUrl = 'https://www.youtube.com/shorts/QvacXJ7IiFY';

    let para = `<p class="bg-success">Temporibus taciti modi beatae nec mauris voluptas fringilla? Accusantium, eget? Ullamcorper adipiscing nonummy luctus voluptates a vivamus ducimus corporis montes, saepe id assumenda imperdiet. Cursus felis animi vehicula facilisi quia? Vero dolore nostrud aliquid ad dolorum etiam quisque eu praesent porro do! Fugiat labore odit provident? Inventore aliquam vehicula fusce.</p>

<p class="bg-warning">Eos nonummy asperiores minima, eligendi aliquid consectetur class, aspernatur consequuntur inventore rhoncus per quos animi delectus accumsan saepe exercitation mattis penatibus rerum, magnam quam urna, laboris at id? Commodi, molestie. Commodi nisi, curae, quas beatae purus blandit, pariatur libero morbi dolorem nisl ex cupiditate a justo! Numquam ducimus irure augue.</p> 

<p class="bg-info">Eos nonummy asperiores minima, eligendi aliquid consectetur class, aspernatur consequuntur inventore rhoncus per quos animi delectus accumsan saepe exercitation mattis penatibus rerum, magnam quam urna, laboris at id? Commodi, molestie. Commodi nisi, curae, quas beatae purus blandit, pariatur libero morbi dolorem nisl ex cupiditate a justo! Numquam ducimus irure augue.</p>

<p>Eos nonummy asperiores minima, eligendi aliquid consectetur class, aspernatur consequuntur inventore rhoncus per quos animi delectus accumsan saepe exercitation mattis penatibus rerum, magnam quam urna, laboris at id? Commodi, molestie. Commodi nisi, curae, quas beatae purus blandit, pariatur libero morbi dolorem nisl ex cupiditate a justo! Numquam ducimus irure augue.</p>

<p>Eos nonummy asperiores minima, eligendi aliquid consectetur class, aspernatur consequuntur inventore rhoncus per quos animi delectus accumsan saepe exercitation mattis penatibus rerum, magnam quam urna, laboris at id? Commodi, molestie. Commodi nisi, curae, quas beatae purus blandit, pariatur libero morbi dolorem nisl ex cupiditate a justo! Numquam ducimus irure augue.</p>

`;

    let embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/IzQ3gFRj0Bc?si=ezVQJ1aTV2P-NkPE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

    let htmlContent = `<div><p>This is a modal content. <button class="move-btn">✥</button>
</p></div>`;

    document.getElementById('openVideoModal').addEventListener('click', () => {
        modalManager.addModal({
            userSelect: false,
            draggable: false,
            dragHandle: ``,
            body: {
                noPadding: true,
                contentType: 'iframe',
                iframeCode: embedCode,
                aspectRatio : 16/9
            },
            /*transitionDuration : 100,*/
            header: {
                enabled: 0,
                content: `<h3>The big lie about nuclear waste</h3>`
            },
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

        let dragId = LMS._.guid();

        modalManager.addModal({
            delayInMilliSeconds : 0,
            position : 'bottom-right',
            cssClass : {
                modal : '',
                modalClose: 'damn-modal',
                modalOk : 'ok-modal2'
            },
            /*width : {
                value: 1200,
                unit: 'px'
            },*/

            /*height: {
                value: 900,
                unit: 'px'
            },*/

            xButton: {
                enabled: true,
                content: `<i class="fa fa-fw fa-close icon"></i>`,
                cssClass2: 'large-button',
                inlineStyles2: 'font-size: 30px;padding: 10px;background-color: red !important;border-width: 5px;border-color: #000;border-style: solid;border-radius: 50% !important;aspect-ratio: 1; width: 40px;height: 40px;'
            },


            userSelect: false,
            draggable: false,
            dragHandle: ``,
            transitionDuration : 200,
            header: {
                enabled: true,
                title: `<span class="text-info">Modal Title</span>`,
                titleTag : 'h1',
                inlineStyles : 'padding: 30px;'
            },
            body : {
                contentType : 'template',
                templateId : 'modal-content-1234',
                content : para,
                iframeCode : embedCode,
                cssClass : '',
                inlineStyles : 'width: 800px;padding: 30px;',
                /*aspectRatio: 16/9,*/
                videoUrl :  ytUrl,
                maxHeight2 : {
                    value: 400,
                    unit : 'px'
                }
            },
            footer: {
                enabled: true,
                content: `<div class="d-flex fd-row jc-center gap-3">
<button class='damn-modal lm-btn lm-btn-error'>Close</button>
</div>`,
                mode: 'custom',
                onOk: function () {
                    console.log('%c%s', 'background-color: green;color: #fff;font-size: 1.2em;padding: 1em;', `Is ok?`);
                    this.hide();
                },
                inlineStyles: 'padding: 30px;'
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


});

function __mc_content(args) {

    try {

        let obj = JSON.parse(args);

        return `${obj.name} (${obj.age}M) had a little lamb ....: ${args}`;

    } catch (error) {
        return 'Invalid JSON data ...' + args;
    }


}