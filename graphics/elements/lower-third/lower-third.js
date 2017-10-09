(function () {
    'use strict';
    
    const ltVisible = nodecg.Replicant('ltVisible');
    const name = nodecg.Replicant('speakerName');
    const byline = nodecg.Replicant('speakerByline');

    Polymer({
        is: 'lower-third',

        properties: {
            name: {
                type: Text
            },
            byline: {
                type: Text
            }
        },

        ready() {
            name.on('change', newVal => {
                console.log(`lower-third: Detected name change to "${newVal}".`);
                this.name = name.value;
            });
            byline.on('change', newVal => {
                console.log(`lower-third: Detected byline change to "${newVal}".`);
                this.byline = byline.value;
            });
            ltVisible.on('change', newVal => {
                console.log(`lower-third: ltVisible changed to ${ltVisible.value}.`);
                if (newVal) {
                    this.show();
                } else {
                    this.hide();
                }
            });
            this.name = name.value;
        },

        show() {
            console.log(`lower-third: Showing container.`);
            TweenMax.to(this.$.lower3rd, 1, {opacity: 1});
            
        },

        hide() {
            console.log(`lower-third: Hiding container.`);
            TweenMax.to(this.$.lower3rd, 1, {opacity: 0});
        }
    });
})();