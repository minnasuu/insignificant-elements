import './index.css'
import { useEffect } from 'react'

const LinkArrowAnimation = () => {
    useEffect(() => {
        const trigger = document.querySelector('.link-arrow-animation')?.parentElement?.parentElement?.parentElement as HTMLDivElement;
        if(trigger){
            trigger.addEventListener('mouseenter', () => {
                trigger.querySelector('.link-arrow-animation')?.setAttribute('data-hovered', 'true')
            })
            trigger.addEventListener('mouseleave', () => {
                trigger.querySelector('.link-arrow-animation')?.setAttribute('data-hovered', 'false')
            })
        }
    }, [])
  return (
    <svg className="link-arrow-animation" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" overflow="hidden" data-variant="secondary" data-hovered="false" 
      style={{transform:'translate(2px, 0) rotate(225deg)',transformOrigin:'center',flex:'0 0 auto',borderRadius:'50%'}}
      >
        <g>
          <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.12"></circle>
          <g className="link-arrow-animation-g" style={{transformOrigin:'0% 0% 0px',transformBox:'fill-box'}}>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".9" strokeWidth="1.5" d="M8.5 4.812v6.5m0 0 2.5-2.5m-2.5 2.5L6 8.812"></path>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".9" strokeWidth="1.5" transform="translate(0 -20)" d="M8.5 4.812v6.5m0 0 2.5-2.5m-2.5 2.5L6 8.812"></path>
          </g>
        </g>
      </svg>
  ) 
}

export default LinkArrowAnimation