(function () {
    'use strict';

    var ltAutoDuration = nodecg.Replicant('ltAutoDuration');
    var ltVisible = nodecg.Replicant('ltVisible');

    Polymer({
        is: 'lower-third',

        properties: {
            ltAutoDuration: {
                type: Number
            }
        },
        
        ready() {
            ltAutoDuration.on('change', newVal => {
                this.ltAutoDuration = newVal;
                console.log(`replicant: ltAutoDuration is now ${ltAutoDuration}`);
                this.ltAutoDuration = newVal;
            })

            this.$.ltToggle.addEventListener('click', () => {
                console.log(`ltVisible = ${ltVisible.value}`);
                if (ltVisible.value === true) {
                    ltVisible.value = false;
                } else {
                    ltVisible.value = true;
                }
                
            })

            ltVisible.on('change', newVal => {
                this.ltVisible = newVal;
                if (newVal) {
                    this.$.ltToggle.innerText = "Hide";
                    this.$.ltToggle.setAttribute('class', 'red');
                } else {
                    this.$.ltToggle.innerText = "Show";
                    this.$.ltToggle.setAttribute('class', 'green');
                }
            })
        }
    });    
})()