import { MutableRefObject, useRef } from 'react'
import { TourProps } from 'antd'
import optionsImg from '@src/assets/images/tour/options.png'
export const usePopupStepRef = () => {
  const refs: any = Array.from({ length: 14 }, () => useRef(null))
  return refs
}
export const useTourPopupSteps = (refs: MutableRefObject<null>[]) => {
  const steps: TourProps['steps'] = [
    {
      title: 'Create a Compelling Popup Title',
      description:
        'Craft a descriptive and engaging title for your popup. Make it stand out and captivate your audience.',
      target: () => refs[0].current,
    },
    {
      title: 'Save Draft',
      description:
        'Preserve your work by saving the popup as a draft before finalizing. This ensures meticulous attention to detail without immediate client exposure.',
      target: () => refs[1].current,
    },
    {
      title: 'Preview Across Devices',
      description:
        "Visualize your popup's appearance on both desktop and mobile devices. Ensure a seamless and responsive user experience.",
      target: () => refs[2].current,
    },
    {
      title: 'Set Popup Live',
      description:
        'Initiate client engagement by sending the popup live. Deliver your content effectively and leave a lasting impression.',
      target: () => refs[3].current,
    },
    {
      title: 'Choose the Format Wisely',
      description:
        'Optimize the format based on your content. Select a small format for brevity or a large format for comprehensive messaging.',
      target: () => refs[4].current,
    },
    {
      title: 'Control Title Visibility',
      description:
        'Manage the visibility of your popup title to clients. Choose whether to display it or keep it hidden for a sleek design.',
      target: () => refs[5].current,
    },
    {
      title: 'Prioritize Popup Importance',
      description:
        'Allocate priority levels - Normal, Important, or Urgent - to tailor the attention your popup receives. Customize it for optimal impact.',
      target: () => refs[6].current,
    },
    {
      title: 'Select Replay Type',
      description:
        'Define how clients can respond to your popup - whether through comments, emojis, or no replay option.',
      target: () => refs[7].current,
    },
    {
      title: 'Choose Popup Position',
      description:
        'Determine where your popup appears for clients. Control the position to enhance visibility and engagement.',
      target: () => refs[8].current,
    },
    {
      title: 'Access the Popup Editor',
      description:
        'Unlock customization options in the Popup Editor. Tailor your popup to perfection with versatile editing tools.',
      target: () => refs[9].current,
    },
    {
      title: 'Dashed Line Tool',
      description:
        'Use the dashed line tool strategically to add or remove elements within your popup. Enhance layout and structure effortlessly.',
      target: () => refs[10].current,
    },
    {
      title: 'Explore Additional Options',
      description:
        'Unlock a world of possibilities by accessing more options - drag and drop, add text, insert custom buttons, or include custom videos.',
      cover: (
        <img
          style={{
            height: '200px',
            width: '30%',
          }}
          alt="tour.png"
          src={optionsImg}
        />
      ),
      target: () => refs[11].current,
    },
    {
      title: 'Delete Block',
      description:
        'Effortlessly remove unwanted elements with the Delete Block icon. Streamline your popup content for maximum impact.',
      target: () => refs[12].current,
    },
    {
      title: 'Edit Button or Video',
      description:
        'Refine and modify buttons or videos within your popup using the Edit icon. Ensure your content remains dynamic and up-to-date.',
      target: () => refs[13].current,
    },
  ]
  return steps
}
