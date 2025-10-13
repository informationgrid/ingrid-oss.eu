# Official documentation of **InformationGrid.eu**

InGrid is a modular software programme that can be used in a variety of ways: The core components are a web portal, a search engine, a metadata catalogue with profiles for recording INSPIRE-compliant metadata, open data and EIA projects, a visualisation component for OGC Web Map Services, a client for visualising time series and various access and query interfaces that are responsible for researching the connected components, but also for forwarding the results to external systems.

You can find the documentation at https://ingrid-oss.eu

![InGrid Overview](./docs/assets/drawio/ingrid-overview.svg "InGrid Overview")


## Edit documentation
The documentation is organized in versions. Each version has its branch.
* The "draft" branch always contains the newest changes.
  * See `.docs-version` to check which version it currently represents.
* Go to folder `docs` and edit the markdowns.
* Commit and push your changes.
* Deployment is automated with a GitLab CI pipeline.

### Edit older documentations
* Checkout the branch version that you want to update (e.g. `git checkout 0.1`)
* Commit and push your changes

## Development

There is no need to install any dependencies if you want to make basic edits of existing markdowns. However, if you wish to add more complex changes (e.g. add new markdowns, edit navigation), you might want to preview your changes.

> **HINT: Navigation/Menu** 
> 
> If you wish to add new markdown files you need to include it in `mkdocs.yml` at field `nav`.

> **HINT Layout/Theme** 
> 
> To edit layout files go to folder `theme` .

To preview your local changes, install python and pip. It is recommended to use a python environment.

### Option A - VS Code devcontainer

* Open repo in VS Code
* Install VS Code extension `Dev Containers`
* Press `F1` and run the command `Dev Containers: Reopen in container`
* Open new terminal and run `mkdocs serve --watch-theme`
* Visit http://localhost:8000

### Option B - Python Environment 
Install Python 3.13
``` sh
# Create a virtual env
python3 -m venv ./.venv
# Activate virtual env
source ./.venv/bin/activate
# Install requirements
pip install -r requirements.txt
# Start MkDocs
mkdocs serve --watch-theme
```
Visit http://localhost:8000/
