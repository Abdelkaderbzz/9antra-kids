import { rgbToHex } from '@src/helpers/helpersFunc'

export const generatePopupAsJson = (htmlArray: string[]) => {
  let components: any = []
  htmlArray.map((el) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(el, 'text/html')
    if (el?.includes('btn-234-custom')) {
      const buttonObject = generateJsonButton(doc)
      components.push(buttonObject)
    } else if (el?.includes('</iframe>')) {
      const videoObject = generateJsonVideo(doc)
      components.push(videoObject)
    } else if (el?.includes('<img')) {
      const ImgObject = generateJsonImg(doc)
      components.push(ImgObject)
    } else if (el !== '') {
      const content = convertHtmlToObjectArrayWithStyleHistory(el, 'rtl')
      components.push({ type: 'text', value: content, direction: 'rtl' })
    }
  })
  return components
}

const generateJsonButton = (doc: Document) => {
  const divElement: any = doc.querySelector('.custom-button')
  const aElement: HTMLAnchorElement | null | undefined = divElement?.querySelector('a')
  const align = divElement?.style?.textAlign
  const value = aElement?.textContent?.trim()
  const backgroundColor = rgbToHex(aElement?.style?.backgroundColor)
  const color = rgbToHex(aElement?.style?.color)
  const fontSize = aElement?.style?.fontSize && parseInt(aElement?.style?.fontSize)
  const paddingY = aElement?.style?.padding && parseInt(aElement?.style?.padding.split(' ')[0])
  const paddingX = aElement?.style?.padding && parseInt(aElement?.style?.padding.split(' ')[1])
  const borderRaduis = aElement?.style?.borderRadius && parseInt(aElement?.style?.borderRadius)
  const fontFamily = aElement?.style?.fontFamily
  const fontWeight = aElement?.style?.fontWeight
  const url = aElement?.getAttribute('href')
  return {
    type: 'button',
    url,
    color,
    align,
    value,
    backgroundColor,
    fontSize,
    paddingX,
    paddingY,
    borderRaduis,
    fontFamily,
    fontWeight,
  }
}
const generateJsonVideo = (doc: Document) => {
  const iframeElement: HTMLIFrameElement | null = doc.querySelector('iframe')
  const url = iframeElement?.getAttribute('src')
  return { type: 'video', value: url }
}
const generateJsonImg = (doc: Document) => {
  const imgElement: HTMLImageElement | null = doc.querySelector('img')
  const base64 = imgElement?.getAttribute('src')
  return { type: 'image', value: base64 }
}

function convertHtmlToObjectArrayWithStyleHistory(html: string, direction: string) {
  html = processHTML(html)
  html = modifyHtmlTags(html)
  html = modifyHtmlFontTags(html)
  let tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  let result: any = []
  let styleState: any = { ...tempDiv.style }
  let styleHistory: any = []
  function updateStyleState(style: any) {
    Object.assign(styleState, style)
  }
  function applyStyle(node: any) {
    let style = node.style
    for (let property in style) {
      if (Object.hasOwnProperty.call(style, property) && style[property] !== '') {
        updateStyleState({ [property]: style[property] })
      }
    }
  }
  function removeStyleHistory(level: any) {
    styleHistory = styleHistory.filter((entry: any) => entry.level <= level)
  }

  function traverse(node: any, level: any) {
    if (node.nodeType === 3) {
      const content = node.textContent
      if (content !== '') {
        result.push({
          content: content,
          style: {
            ...(!styleState?.backgroundColor
              ? {}
              : { backgroundColor: rgbToHex(styleState?.backgroundColor) }),
            ...(!styleState?.color ? {} : { color: rgbToHex(styleState?.color) }),
            ...(!styleState?.fontWeight ? {} : { bold: true }),
            ...(!styleState?.textAlign
              ? { textAlign: `${direction === 'rtl' ? 'right' : 'left'}` }
              : { textAlign: styleState?.textAlign }),
            ...(!styleState?.fontStyle ? {} : { italique: true }),
            ...(!styleState?.fontSize
              ? { fontSize: 16 }
              : { fontSize: parseInt(styleState?.fontSize) }),
            ...(!styleState?.fontFamily
              ? { fontFamily: 'Poppins' }
              : { fontFamily: styleState?.fontFamily }),
          },
        })
        styleState = {}
        // styleHistory = []
      }
    } else if (node.nodeType === 1) {
      const item = node.nodeName.toLowerCase()
      if (['div', 'p'].includes(item)) {
        result.push({ content: '$br' })
      }
      applyStyle(node)
      styleHistory[level] = { ...styleState }
      removeStyleHistory(level)
      node.childNodes.forEach(function (childNode: any) {
        traverse(childNode, level + 1)
      })
    }
  }

  traverse(tempDiv, 0)
  result = result.splice(1)
  if (result?.[0]?.content === '$br') {
    result = result.splice(1)
  }
  return result
}

function modifyHtmlTags(htmlString: any) {
  // Create a temporary div element to hold the HTML string
  var tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString

  // Find all <strong> tags
  var strongTags = tempDiv.querySelectorAll('strong')
  strongTags.forEach(function (strongTag) {
    // Iterate through child elements
    strongTag.style.fontWeight = 'bold'
    strongTag.childNodes.forEach(function (child: any) {
      // Add font-weight:bold to the child elements
      if (child.nodeType === 1) {
        // Check if it's an element node
        child.style.fontWeight = 'bold'
      }
    })
  })

  // Find all <em> tags
  var emTags = tempDiv.querySelectorAll('em')
  emTags.forEach(function (emTag) {
    // Iterate through child elements
    emTag.style.fontStyle = 'italic'
    emTag.childNodes.forEach(function (child: any) {
      // Add font-style:italic to the child elements
      if (child.nodeType === 1) {
        // Check if it's an element node
        child.style.fontStyle = 'italic'
      }
    })
  })

  // Return the modified HTML string
  return tempDiv.innerHTML
}

function modifyHtmlFontTags(htmlString: any) {
  var tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString
  var elementsWithFontFamily = tempDiv.querySelectorAll('[style*="font-family"]')
  elementsWithFontFamily.forEach(function (element: any) {
    var computedFontFamily = element.style.fontFamily
    element.querySelectorAll('*').forEach(function (child: any) {
      if (!child.style.fontFamily) {
        child.style.fontFamily = computedFontFamily
      }
    })
  })
  var elementsWithFontFamily = tempDiv.querySelectorAll('[style*="color"]')
  elementsWithFontFamily.forEach(function (element: any) {
    var computedColor = element.style.color
    element.querySelectorAll('*').forEach(function (child: any) {
      if (!child.style.color) {
        child.style.color = computedColor
      }
    })
  })
  var elementsWithFontFamily = tempDiv.querySelectorAll('[style*="font-size"]')
  elementsWithFontFamily.forEach(function (element: any) {
    var computedFontSize = element.style.fontSize
    element.querySelectorAll('*').forEach(function (child: any) {
      if (!child.style.fontSize) {
        child.style.fontSize = computedFontSize
      }
    })
  })

  return tempDiv.innerHTML
}

function processHTML(htmlString: any) {
  var tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString

  function processAdjacentText(node: any) {
    var sibling = node.nextSibling
    if (sibling && sibling.nodeType === Node.TEXT_NODE && sibling.nodeValue.trim().length > 0) {
      var span = document.createElement('span')
      span.textContent = sibling.nodeValue
      node.parentNode.insertBefore(span, sibling)
      sibling.nodeValue = ''
    }
  }

  function traverse(node: any) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      for (var i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i])
      }
      processAdjacentText(node)
    }
  }

  traverse(tempDiv)

  return tempDiv.innerHTML
}
