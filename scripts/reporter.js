const $errors = document.querySelector('.errors')

function DetectBrowser() {
  let nAgt = navigator.userAgent;
  let browserName  = navigator.appName;
  let fullVersion  = ''+parseFloat(navigator.appVersion); 
  let majorVersion = parseInt(navigator.appVersion,10);
  
  let nameOffset,verOffset,ix;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset+6);
    if ((verOffset=nAgt.indexOf("Version"))!=-1) {
      fullVersion = nAgt.substring(verOffset+8);
    }
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset+5);
  }
  // In Chrome, the true version is after "Chrome" 
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset+7);
  }
  // In Safari, the true version is after "Safari" or after "Version" 
  else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset+7);
    if ((verOffset=nAgt.indexOf("Version"))!=-1) {
      fullVersion = nAgt.substring(verOffset+8);
    }
  }
  // In Firefox, the true version is after "Firefox" 
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset+8);
  }
  // In most other browsers, "name/version" is at the end of userAgent 
  else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) 
  {
    browserName = nAgt.substring(nameOffset,verOffset);
    fullVersion = nAgt.substring(verOffset+1);
    if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix=fullVersion.indexOf(";"))!=-1) {
    fullVersion=fullVersion.substring(0,ix);
  }
  if ((ix=fullVersion.indexOf(" "))!=-1) {
    fullVersion=fullVersion.substring(0,ix);
  }

  majorVersion = parseInt(''+fullVersion,10);

  if (isNaN(majorVersion)) {
    fullVersion  = ''+parseFloat(navigator.appVersion); 
    majorVersion = parseInt(navigator.appVersion,10);
  }

  return {
    browserName,
    fullVersion,
    majorVersion,
    nAgt,
    url: window.location.href,
  }
}

function errorHandler(message, source, lineno, colno, error) {
  const $error = document.createElement('div')
  const {
    browserName,
    fullVersion,
    majorVersion,
    nAgt,
    url,
  } = DetectBrowser()
  
  $error.classList.add('error', 'js')
  $error.innerText = `
    Message: ${message}
    Source: ${source}
    Line: ${lineno}
    Col: ${colno}
    Error: ${error}
    Browser:
      User Agent: ${nAgt}
      Name: ${browserName}
      Version: ${fullVersion}
      Major Version: ${majorVersion} 
      URL: ${url}
  `

  $errors.appendChild($error)
}

window.onerror = errorHandler

// images

function imageErrorHandler(event) {
  const {
    src,
  } = event.target
  const $error = document.createElement('div')
  const {
    browserName,
    fullVersion,
    majorVersion,
    nAgt,
    url,
  } = DetectBrowser()

  $error.classList.add('error', 'img')
  $error.innerText = `
    Message: Image error
    Source: ${src}
    Browser:
      User Agent: ${nAgt}
      Name: ${browserName}
      Version: ${fullVersion}
      Major Version: ${majorVersion} 
      URL: ${url}
  `

  $errors.appendChild($error)
}

const $images = document.querySelectorAll('img')

$images.forEach(($image) => {
  $image.onerror = imageErrorHandler
})
