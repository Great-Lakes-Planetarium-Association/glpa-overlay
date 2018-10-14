# Introduction

The `glpa-overlay` package is a [NodeCG](http://github.com/nodecg/nodecg) bundle.  The package is used at the annual [GLPA](https://www.glpa.org) conference to display information between sessions.


# Installation
This bundle is intended to be installed on the system driving [OBS Studio](http://www.obsproject.com).  The bundle will generate HTML content that OBS can ingest to overlay things such as the lower third and the GLPA bug.

## Requirements
`glpa-overlay` requires a working NodeCG environment.  All requirements for NodeCG are also required for `glpa-overlay`.  As of this writing, those requirements are:

* Node.js 8.3+
* npm 2.0+

### Node Modules
NodeCG and this bundle make use of the following Node.JS modules:

* pm2 - Run NodeCG as a background service task
* bower - front-end package management tool.  
  Note: it is recommended to still use bower despite it being deprecated.  Polymer still requires bower usage and therefore using yarn adds additional, unnecessary complexity.
* nodecg-cli - NodeCG utility for installing bundles and creating a default bundle configuration.


## Windows
### Chocolatey
Chocolatey is a Windows package manager which can be used to download and install software.  This is an optional step, but the following setup commands assume Chocolatey is present.  If you do not use Chocolatey, you will need to obtain and install the packages through alternative means.

To install Chocolatey, open a PowerShell administrative command prompt and run:

```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

### Install Components
Install Node.JS and git:

```
choco install NodeJS git -y
```

### Install NodeCG
```
npm install -g bower pm2 nodecg-cli
mkdir C:\NodeCG\
cd C:\NodeCG
git clone https://github.com/nodecg/nodecg.git .
npm install --production
bower install
```

### Install the `glpa-infodisplay` bundle
```
nodecg install bitbucket:glpa_av/glpa-overlay
cd C:\NodeCG\bundles\glpa-overlay
bower install
```

This completes the installation.  You will now need to configure the bundle.

# Bundle Configuration
This bundle uses the NodeCG `configschema.json` to define the configuration required.  Upon initialization of the bundle using `nodecg defaultconfig` a configuration file will be automatically generated using this schema.  Bundle configurations are stored at `C:\NodeCG\cfg\glpa-overlay.json` and can be modified manually afterward.

```
nodecg defaultconfig
```

This will create the appropriate configuration file `C:\NodeCG\cfg\glpa-overlay.json`.  You will need to edit the contents of this file as appropriate.  Since authentication keys will be present this file should not be committed into the repository.

**Note:** NodeCG will compare the bundle's configuration against the `configschema.json` at startup.  If there are extra parameters or missing parameters the bundle will not be loaded.

Additionally, you can review the NodeCG documentation on a [package.json manifest](https://nodecg.com/tutorial-5_manifest.html).

# Running NodeCG
## Console Window
You can run the NodeCG service in a console window.  Note that if the window is closed NodeCG will be terminated.

```
cd C:\NodeCG\
node index.js
```

## PM2
Using P2 you can run NodeCG as a background process/service.

```
# Start
pm2 start C:\NodeCG\index.js

# Stop
pm2 stop <pid>

# Reload
pm2 reload <pid>

# Get logs
pm2 logs --lines <n> <pid>
```