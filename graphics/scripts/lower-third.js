(function () {
    'use strict';
    
    const ltVisible = nodecg.Replicant('ltVisible');
    const ltPresenter = nodecg.Replicant('ltPresenter');
    const ltTimeRemaining = nodecg.Replicant('ltTimeRemaining', {default: 0, persistent: false});
    let interval;
    let timer;

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
            ltPresenter.on('change', newVal => {
                console.log(`lower-third: ltPresenter replicant updated (Name: "${newVal.name}"; Byline: "${newVal.byline}")`)
                this.name = newVal.name;
                this.byline = newVal.byline;
            })
            ltVisible.on('change', newVal => {
                console.log(`lower-third: ltVisible changed to ${ltVisible.value}.`);
                if (newVal > 0) {
                    this.show();
                } else {
                    this.hide();
                }
            });

            // Listen for autotake calls
            nodecg.listenFor('ltAuto', duration => {
                console.log(`lower-third: performing an auto-take for ${duration} seconds`);
                ltTimeRemaining.value = duration;
                this.show();
                interval = setInterval(() => {
                    if (ltTimeRemaining.value > 0) {
                        ltTimeRemaining.value--;
                        console.log(`Time left: ${ltTimeRemaining.value}`);
                    } else {
                        clearInterval(interval);
                        ltTimeRemaining.value = 0;
                    }}, 
                    1000);
                
                timer = setTimeout(() => {
                    clearInterval(interval);
                    this.hide();
                }, duration*1000);

            })

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