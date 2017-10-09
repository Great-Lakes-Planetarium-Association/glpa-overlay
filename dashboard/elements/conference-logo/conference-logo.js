(function () {
	'use strict';

	const logoSelector = nodecg.Replicant('logoSelector', {defaultValue: 'off'});

	Polymer({
        is: 'conference-logo',
        
        ready() {
            this.$.color.addEventListener('click', () => {
                logoSelector.value = 'color';
			});
			
			this.$.ghost.addEventListener('click', () => {
				logoSelector.value = 'ghost';
			});

            this.$.hide.addEventListener('click', () => {
				logoSelector.value = 'off';
            });
    
            logoSelector.on('change', newVal => {
				switch(newVal) {
				case "color":
					console.log('conference-logo: Color logo enabled');
					this.$.color.setAttribute('disabled', 'true');
					this.$.ghost.removeAttribute('disabled');
					this.$.hide.removeAttribute('disabled');
					break;
				case 'ghost':
					console.log('conference-logo: Ghost logo enabled');
					this.$.color.removeAttribute('disabled');
					this.$.ghost.setAttribute('disabled', 'true');
					this.$.hide.removeAttribute('disabled');
					break;
				case 'off':
					console.log('conference-logo: Logo turned off');
					this.$.color.removeAttribute('disabled');
					this.$.ghost.removeAttribute('disabled');
                    this.$.hide.setAttribute('disabled', 'true');
				}
            })
        }
        
    });    
})()
