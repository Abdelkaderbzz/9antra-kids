import { Avatar } from "antd";

export function transformTourData(inputArray: any)
{

  const resArr = inputArray.map((item: any) =>
  {
    console.log(item?.selector)
    const target = getElementFromSelector(item.selector);
    console.log(target)
    return {
      title: <div className="tour-step-preview-header">
        <Avatar className="tour-creater-avatar" />
        <p>Amir from softylines</p>
      </div>,
      hideCloseButton: false,
      disableOverlayClose: true,
      event: 'click',
      // hideFooter: true,
      placement: 'bottom',
      target: target,
      content: <div className='tour-preview-step-content'>{item.blocks[0]?.text || ''}</div>,
      style: {
        arrowColor: '#f0f0f0',
        backgroundColor: '#000',
        color: '#fff',
      },
      disableBeacon: true,
      spotlightPadding: 10,
      buttonText: item.button_text || 'Next',
    }
  })
  return resArr
}
const getElementFromSelector = (selector: string): Element | null =>
{
  try
  {
    return document.querySelector(selector);
  } catch (error)
  {
    console.error("Invalid selector:", selector, error);
    return null;
  }
}