const MASK = "M1251.5,401a444.851,444.851,0,0,0-119.88,16.373c90.85-68.25,142.1-130.083,142.1-130.083q20.8,61.246,37.63,117.734A448.461,448.461,0,0,0,1251.5,401ZM807,845.5c0,245.49,199.01,444.5,444.5,444.5a446.712,446.712,0,0,0,85.89-8.32c-93.44,173.4-240.62,267.34-254.87,276.16-0.01.25-.01,0.39-0.01,0.39s-0.21-.01-0.61-0.02c-0.34.21-.51,0.32-0.51,0.32s-0.07-.12-0.2-0.33c-24.94-.66-399.284-15.83-581.911-339.54,0,0-133.435-219.208-223.4-661.629,0,0,257.1,94.069,532.306,17.8q3.3-1.044,6.761-1.921l0.565-.146c0.187-.054.374-0.1,0.561-0.159q3.435-.991,6.809-1.746a809.715,809.715,0,0,0,114.286-39.642A443.108,443.108,0,0,0,807,845.5Z"
const YELLOW_FACE = "M819,855.5c0-130.047,56.5-246.882,146.272-327.351,65.508-27.775,123.208-61.6,171.678-95.109a442.11,442.11,0,0,1,213.99-7.27c98.87,352.747,92.73,559.089,92.73,559.089,0.38,114.6-28.94,213.051-70.66,295.041A439.862,439.862,0,0,1,1258.5,1295C1015.77,1295,819,1098.23,819,855.5Z"
const SMILE_EYES = "M479.272,997.248s35.38-167.588,140.419-194.816S793,890.985,793,890.985,591.182,889.083,479.272,997.248Z"
const SMILE_LIPS = "M661.262,1214.53s163.414,201.3,403,93.02L930.328,1172.52S753.378,1216.32,661.262,1214.53Z"
const SAD_EYES = "M949.825,705.2s76.535,160.4,195.305,136.362S1309,590,1309,590,1135.72,742.532,949.825,705.2Z"
const SAD_LIPS = "M1325,1190s-66.72-212.652-402.331-108.23l137.221,158.89S1104.93,1162.92,1325,1190Z"
const MAGNIFIER = "M1523.1,1251.76l184.87,355.97c11.37,21.89-1.07,50.88-27.78,64.76l-12.43,6.45c-26.71,13.87-57.58,7.37-68.95-14.52l-185.08-356.37A491.84,491.84,0,0,1,1245,1337.7c-272.11,0-492.7-220.59-492.7-492.7S972.89,352.3,1245,352.3,1737.7,572.89,1737.7,845C1737.7,1013.93,1652.68,1162.99,1523.1,1251.76ZM1247,452c-217.05,0-393,175.952-393,393s175.95,393,393,393,393-175.95,393-393S1464.05,452,1247,452Z"
const STAR = "M1614.13,754.739c-6.07-51.759-39.17-231.366-205.93-226.358,3.07-.066,171.21-5.183,185.89-247.219l1-.042c35.03,239.8,202.81,230.337,205.87,230.144-166.4,9.085-184.16,191.385-185.83,243.443"

const INK = '#3d26bd'
const YELLOW = '#ffc229'

const LENS = { cx: 1239, cy: 843, r: 415 }

const CSS = `
.lm-move, .lm-counter, .lm-star { transition: transform .9s cubic-bezier(.34,1.25,.64,1); }
.lm-focus { opacity: 0; transition: opacity .3s ease; }
.lm-base { transition: opacity .01s linear; }
.lm-bridge { opacity: 0; transition: opacity .45s ease; }
.lm-flip { transform-box: fill-box; transform-origin: center; transition: transform .6s cubic-bezier(.34,1.25,.64,1); }
.lm-face { transition: fill .45s ease, stroke .45s ease, opacity .01s linear; }
.lm-star { transform-box: fill-box; transform-origin: center; }
.sentio-logo-link:hover .lm-move,
.sentio-logo-link:focus-visible .lm-move { transform: translate(-599px, 217px) translate(1239px, 843px) rotate(100deg) scale(0.85) translate(-1239px, -843px); }
.sentio-logo-link:hover .lm-counter,
.sentio-logo-link:focus-visible .lm-counter { transform: translate(1239px, 843px) scale(1.1765) rotate(-100deg) translate(-1239px, -843px) translate(599px, -217px); }
.sentio-logo-link:hover .lm-face,
.sentio-logo-link:focus-visible .lm-face { fill: #fff; stroke: #fff; }
.sentio-logo-link:hover .lm-base,
.sentio-logo-link:focus-visible .lm-base { opacity: 0; transition-delay: .5s; }
.sentio-logo-link:hover .lm-bridge,
.sentio-logo-link:focus-visible .lm-bridge { opacity: 1; }
.sentio-logo-link:hover .lm-flip,
.sentio-logo-link:focus-visible .lm-flip { transform: scaleY(-1); transition-delay: .3s; }
.sentio-logo-link:hover .lm-focus,
.sentio-logo-link:focus-visible .lm-focus { opacity: 1; transition-delay: .2s; }
.sentio-logo-link:hover .lm-star,
.sentio-logo-link:focus-visible .lm-star { transform: rotate(360deg) scale(1.15); }
@media (prefers-reduced-motion: reduce) {
  .lm-move, .lm-counter, .lm-face, .lm-focus, .lm-bridge, .lm-base, .lm-flip, .lm-star { transition: none; }
}`

export default function LogoMark({ className = '', ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="236 241 1605 1485" className={className} style={{ overflow: 'visible' }} aria-hidden="true" {...props}>
      <style>{CSS}</style>
      <defs>
        <path id="lm-mask" d={MASK} />
        <filter id="lm-close" x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology operator="dilate" radius="48" />
          <feMorphology operator="erode" radius="48" />
          <feGaussianBlur stdDeviation="30" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11.5" />
        </filter>
        <clipPath id="lm-lens"><circle cx={LENS.cx} cy={LENS.cy} r={LENS.r} /></clipPath>
      </defs>

      <path className="lm-face lm-base" d={YELLOW_FACE} fill={YELLOW} stroke={YELLOW} strokeWidth="8" strokeLinejoin="round" fillRule="evenodd" />

      <use className="lm-base" href="#lm-mask" fill="#fff" stroke="#fff" strokeWidth="8" strokeLinejoin="round" fillRule="evenodd" />
      <g className="lm-bridge" filter="url(#lm-close)" fill="#fff">
        <use href="#lm-mask" />
        <path d={YELLOW_FACE} />
      </g>
      <path className="lm-flip" d={SMILE_EYES} fill={INK} fillRule="evenodd" />
      <path className="lm-flip" d={SMILE_LIPS} fill={INK} fillRule="evenodd" />
      <path className="lm-flip" d={SAD_EYES} fill={INK} fillRule="evenodd" />
      <path className="lm-flip" d={SAD_LIPS} fill={INK} fillRule="evenodd" />

      <g className="lm-focus">
        <g className="lm-move">
          <g clipPath="url(#lm-lens)">
            <g className="lm-counter">
              <path d={YELLOW_FACE} fill={YELLOW} stroke={YELLOW} strokeWidth="30" strokeLinejoin="round" fillRule="evenodd" />
              <use href="#lm-mask" fill={YELLOW} stroke={YELLOW} strokeWidth="30" strokeLinejoin="round" fillRule="evenodd" />
              <path className="lm-flip" d={SMILE_EYES} fill={INK} fillRule="evenodd" />
              <path className="lm-flip" d={SMILE_LIPS} fill={INK} fillRule="evenodd" />
            </g>
          </g>
        </g>
      </g>

      <g className="lm-move">
        <path d={MAGNIFIER} fill="#fff" stroke={INK} strokeWidth="35" strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd" />
      </g>

      <path className="lm-star" d={STAR} fill="#fff" stroke={INK} strokeWidth="35" strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd" />
    </svg>
  )
}