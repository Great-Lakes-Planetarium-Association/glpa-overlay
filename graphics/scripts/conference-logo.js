// Obtain NodeCG replicant
const logoSelector = nodecg.Replicant('logoSelector');

logoSelector.on('change', newVal => {
    console.log(`logoSelector has changed to ${newVal}`);
    if (newVal == 'color') {
        TweenMax.to(this.$.colorLogo, 1, {opacity: 1});
        TweenMax.to(this.$.ghostLogo, 1, {opacity: 0});
    } else if (newVal == 'ghost') {
        TweenMax.to(this.$.colorLogo, 1, {opacity: 0});
        TweenMax.to(this.$.ghostLogo, 1, {opacity: 1});
    } else {
        TweenMax.to(this.$.colorLogo, 1, {opacity: 0});
        TweenMax.to(this.$.ghostLogo, 1, {opacity: 0});
    }
});