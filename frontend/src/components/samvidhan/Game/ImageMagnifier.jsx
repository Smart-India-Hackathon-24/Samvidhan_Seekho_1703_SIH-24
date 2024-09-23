import React from 'react'
// import ImageZoom from "react-image-zooom";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
// import { MapInteractionCSS } from 'react-map-interaction';

// import zoomInImage from "../Assets/zoom-in.png"
// import zoomOutImage from "../Assets/zoom-out.png"
// import resetImage from "../Assets/reset.png"
const ImageMagnifier = ({image}) => {

    const zoomInImage="http://res.cloudinary.com/dxfn9epwh/image/upload/v1725859748/hermz/osum7rvy5v6warpdhkon.png";
    const zoomOutImage="http://res.cloudinary.com/dxfn9epwh/image/upload/v1725859748/hermz/beri7slubbaj8jbsgk9d.png";
    const resetImage="http://res.cloudinary.com/dxfn9epwh/image/upload/v1725859744/hermz/apa7ltk0liyd7bhfphg2.png";
    const Controls = () => {
        const { zoomIn, zoomOut, resetTransform } = useControls();
        return (
            <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button onClick={() => zoomIn()}>
                      <img src={zoomInImage} alt="Zoom In" height={"36px"} width={"36px"}  />
                      </button>
                  <button onClick={() => zoomOut()}>
                  <img src={zoomOutImage} alt="Zoom Out"  height={"36px"} width={"36px"}  />
                  </button>
                  <button onClick={() => resetTransform()}>
                  <img src={resetImage} alt="Reset"  height={"36px"} width={"36px"}  />
                    </button>
                  </div>
        );
      };

  return (
    <>
  <div className="relative cursor-move  " >
      <TransformWrapper
        options={{ limitToBounds: true, centerContent: true }}
        wheel={{ disabled:true }} // Disable default wheel zoom
        // touch={{ touchEnabled: false }} // Disable default touch zoom

      >
        <TransformComponent>
          <img
            src={image}
            alt="test"
            className='w-[60vw] px-12'
            
          />
        </TransformComponent>
        <Controls />
      </TransformWrapper>

    </div>
  </>
  )
}

export default ImageMagnifier



//  https://www.npmjs.com/package/react-image-zooom
//  https://blog.logrocket.com/adding-zoom-pan-pinch-react-web-apps/
//  https://github.cowm/Mario-Duarte/react-image-zooom
// https://bettertyped.github.io/react-zoom-pan-pinch/?path=/story/examples-mini-map--mini-map&globals=backgrounds.grid:false