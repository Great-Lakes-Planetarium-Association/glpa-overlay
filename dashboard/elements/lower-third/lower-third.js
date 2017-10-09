(function () {
    'use strict';

    var ltAutoDuration = nodecg.Replicant('ltAutoDuration', {default: 5, persistent:false});
    var ltVisible = nodecg.Replicant('ltVisible');
    var ltPresenter = nodecg.Replicant('ltPresenter');

    Polymer({
        is: 'lower-third',

        properties: {
            ltAutoDuration: {
                type: Number
            },
            programName: {
                type: String
            },
            programByline: {
                type: String
            }
        },
        
        ready() {
            this.$.presenter1Take.addEventListener('click', () => {
                console.log(`Taking presenter 1 to program`);
                showLowerThird(1, this.$.presenter1Name.value, this.$.presenter1Byline.value);
            })
            this.$.presenter1Autotake.addEventListener('click', () => {
                console.log(`lower-third: Autotaking presenter 1`);
                showLowerThirdAuto(1, this.$.presenter1Name.value, this.$.presenter1Byline.value);
            })

            ltPresenter.on('change', newVal => {
                this.programName = newVal.name;
                this.programByline = newVal.byline;

            })
            ltAutoDuration.on('change', newVal => {
                this.ltAutoDuration = newVal;
                console.log(`replicant: ltAutoDuration is now ${ltAutoDuration}`);
                this.ltAutoDuration = newVal;
            })

            this.$.ltOff.addEventListener('click', () => {
                console.log(`lower-third: All Off clicked`);
                ltVisible.value = false;
                document.querySelectorAll(".take, .autotake").value="HI!";
                
            })

            ltVisible.on('change', newVal => {
                this.ltVisible = newVal;
                if (newVal) {
                    this.$.ltOff.removeAttribute('disabled');
                } else {
                    this.$.ltOff.setAttribute('disabled', 'true');
                }
            })

            function showLowerThird(index, name, byline) {
                console.log('lower-third: showLowerThird called');
                // If lower third is currently active, hide it first
                if (ltVisible>0) {
                    setInterval(hideLowerThird(),2000)
                }
                ltPresenter.value.name = name;
                ltPresenter.value.byline = byline;
                ltVisible.value = 1;
            }

            function hideLowerThird() {
                console.log('lower-third: hiding lower third')
                ltVisible.value = 0;
            }

            function showLowerThirdAuto(index, name, byline) {
                if (ltVisible>0) {
                    setInterval(hideLowerThird(),2000)
                }
                ltPresenter.value.name = name;
                ltPresenter.value.byline = byline;
                ltVisible.value = 1;
                nodecg.sendMessage('ltAuto', 5);
            }
        }
    });    
})()