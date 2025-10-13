window.addEventListener("DOMContentLoaded", function() {
  const archivedVersions = [
    {
        "externalLink": "//archive.ingrid-oss.eu/7.5.0",
        "version": "7.5.0",
        "title": "7.5.0",
        "aliases": [],
        "properties": {
            "hidden": false
        }
    }
  ];

  var pathAsArray = window.location.pathname.split("/");
  var versionRegex = /^\d+\.\d+\.\d+$/;
//   var versionRegex = /^\d+\.\d+$/;
  var CURRENT_VERSION = versionRegex.test(pathAsArray[1]) ? pathAsArray[1] : "dev";
  var CURRENT_PATH_WITHOUT_VERSION = pathAsArray.slice(2);

  function reconstructCurrentPath(version) {
    if (version.startsWith("//archive")) {
      return version
    }
    let link = '/' + version
    CURRENT_PATH_WITHOUT_VERSION.forEach(function(el) {
      link += "/" + el
    })
    return link
  }

  function makeSelect(options, selected) {
    var select = document.createElement("ul");
    select.className = 'md-version__list';

    options.forEach(function(i) {
      var option = new Option(i.text, i.value, undefined, i.value === selected);
      var li = document.createElement('li');
      li.className = 'md-version__item';
      var aTag = document.createElement('a');
      if(option.text.startsWith(CURRENT_VERSION)){
        aTag.classList.add('version-bold')
      }
      aTag.href = reconstructCurrentPath(option.value);
      aTag.classList.add('md-version__link');
      aTag.innerHTML = option.text
      li.appendChild(aTag);
      select.appendChild(li);
    });

    return select;
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/versions.json");
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        handleVersions(JSON.parse(this.responseText));
      } catch (e) {
        console.warn("Failed to parse versions.json, using devVersions.", e);
      }
    } else {
      console.warn("Loading dev versions.");
      handleVersions([]);
    }
  }

function handleVersions(supportedVersions) {
    var versions = [...supportedVersions, ...archivedVersions]

    var realVersion = versions.find(function(i) {
      return i.version === CURRENT_VERSION ||
             i.aliases.includes(CURRENT_VERSION);
    })?.version;

    const versionContainers = Array.from(document.getElementsByClassName("ingrid-version-container"))
    
    versionHintsForDraftAndLatest(versionContainers[0], versions);

    versionContainers?.forEach(versionContainer => {
        var selectOptions = makeSelect(versions.filter(function(i) {
            return i.version === realVersion || !i.properties || !i.properties.hidden;
        }).map(function(i) {
            var includesDraft = i.aliases.includes("draft") 
            var includesLatest = i.aliases.includes("latest") 
            const aliasFlag = includesLatest ? " - latest" 
                            : !includesLatest && includesDraft ? " - draft"
                            : '';
            return {
                text: i.title + aliasFlag, 
                value: i.externalLink ?? i.version,
                selected: i.version === realVersion
            };
        }));

        selectOptions.addEventListener("change", function(event) {
            window.location.href = this.value;
        });

        var selectorDiv = document.createElement('div');
        selectorDiv.className = 'md-version';
        var selectorButton = document.createElement('button');
        selectorButton.className = 'md-version__current';
        selectorButton.innerHTML = CURRENT_VERSION;

        selectorDiv.appendChild(selectorButton);
        selectorDiv.appendChild(selectOptions);

        versionContainer?.appendChild(selectorDiv)
    });
  };



  xhr.send();

  function versionHintsForDraftAndLatest(versionContainer, versions) {
    var latestVersion = versions.find(function(i) {
      return i.aliases.includes("latest");
    })?.version;

    var draftVersion = versions.find(function(i) {
      return i.aliases.includes("draft") ;
    })?.version;

    if(CURRENT_VERSION == draftVersion && latestVersion != draftVersion) {
      // add draft hint
      var hintContainer = document.createElement('div');
      hintContainer.className = 'version-draft-hint';
      hintContainer.innerHTML = draftVersion + " | <small>DRAFT VERSION</small>";
    
      versionContainer.appendChild(hintContainer);
    } 
    
    if (CURRENT_VERSION != latestVersion && CURRENT_VERSION != draftVersion && CURRENT_VERSION == null ) {
      // add hint that this version is not the latest one
      var hintContainer = document.createElement('div');
      hintContainer.className = 'version-not-latest-hint';
      hintContainer.innerHTML = "Die ausgewählte Version ist nicht aktuellen. Klicken Sie hier für die ";

      var aTag = document.createElement('a');
      aTag.href = reconstructCurrentPath(latestVersion);
      aTag.innerHTML = "neueste Version";
      hintContainer.appendChild(aTag);

      versionContainer.appendChild(hintContainer);
    }
  }

});
