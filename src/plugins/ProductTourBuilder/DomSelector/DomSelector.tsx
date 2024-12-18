import React, { useState, useEffect, useCallback } from 'react'

export interface Ioverlay {
  top: number
  left: number
  width: number
  height: number
}
interface DOMSelectorProps {
  onSelect: (overlay: Ioverlay) => void
  onHover: (selector: string) => void
}

export const DOMSelector: React.FC<DOMSelectorProps> = ({ onSelect, onHover }) => {
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null)
  const [overlay, setOverlay] = useState<any>()

  const updateOverlay = useCallback((element: Element) => {
    const rect = element.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    setOverlay({
      top: rect.top + scrollY,
      left: rect.left + scrollX,
      width: rect.width,
      height: rect.height,
    })
  }, [])

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      e.stopPropagation()
      const target = e.target as Element

      // Ignore our own overlay elements
      if (target.closest('[data-selector-overlay]')) return

      setHighlightedElement(target)
      const hovredSelector = generateUniqueSelector(target)
      onHover(hovredSelector)
      updateOverlay(target)
    }

    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (highlightedElement) {
        onSelect(overlay)
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('click', handleClick)
    }
  }, [highlightedElement, onSelect, updateOverlay])

  const generateUniqueSelector = (element: Element): string =>
  {
    // Try ID first
    if (element.id)
    {
      return `#${CSS.escape(element.id)}`;
    }

    // Try unique class combination
    const classes = Array.from(element.classList);
    if (classes.length > 0)
    {
      const uniqueClass = classes.find(cls => document.querySelectorAll(`.${cls}`).length === 1);
      if (uniqueClass)
      {
        return `.${CSS.escape(uniqueClass)}`;
      }
      const classSelector = `.${classes.map(CSS.escape).join('.')}`;
      if (document.querySelectorAll(classSelector).length === 1)
      {
        return classSelector;
      }
    }

    // Generate path with nth-child
    let path: string[] = [];
    let current: Element | null = element;
    let depth = 0;
    const MAX_DEPTH = 5;

    while (current && current !== document.body && depth < MAX_DEPTH)
    {
      let selector = current.tagName.toLowerCase();
      if (current.parentElement)
      {
        const siblings = Array.from(current.parentElement.children);
        const index = siblings.indexOf(current) + 1;
        if (siblings.length > 1)
        {
          selector += `:nth-child(${index})`;
        }
      }
      path.unshift(selector);
      current = current.parentElement;
      depth++;
    }

    const fullSelector = path.join(' > ');
    if (document.querySelectorAll(fullSelector).length === 1)
    {
      return fullSelector;
    }

    // If no unique selector, return the full path or fallback
    return fullSelector || 'body';
  };

  return (
    <>
      {overlay && (
        <div
          data-selector-overlay
          className="selector-overlay"
          style={{
            top: overlay.top,
            left: overlay.left,
            width: overlay.width,
            height: overlay.height,
          }}
        />
      )}
    </>
  )
}
