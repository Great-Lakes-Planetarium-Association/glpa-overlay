// Obtain NodeCG replicant
const logoSelector = nodecg.Replicant('logoSelector');

logoSelector.on('change', visibleLogo => {
    console.log(`logoSelector has changed to ${visibleLogo}`);
    switch (visibleLogo) {
        case 'color':
            console.log('conference-logo: Enabling color bug.');
            document.getElementById("color-bug").style.opacity = '1';
            document.getElementById("ghost-bug").style.opacity = '0';
            break;
        
        case 'ghost':
            console.log("conference-logo: Enabling ghost bug.");
            document.getElementById("color-bug").style.opacity = '0';
            document.getElementById("ghost-bug").style.opacity = '1';
            break;
        
        case 'off':
            console.log("conference-logo: Hiding bug.");
            document.getElementById("color-bug").style.opacity = '0';
            document.getElementById("ghost-bug").style.opacity = '0';
            break;
    }
});