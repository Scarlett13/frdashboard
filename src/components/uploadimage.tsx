import { provideRequestOptions } from "@/libs/api";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Staff } from "@/type/staff";

export default function UploadImage() {
  const [imageSrc, setImageSrc] = useState("/path-to-default-image.jpg");

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpg";
    input.addEventListener("change", (event: any) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        displayImage(file);
      }
    });
    input.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      displayImage(file);
    }
  };

  const displayImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div
        className="border-2 border-dashed p-8 text-center cursor-pointer"
        onClick={handleImageClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="max-w-180 mx-auto">
          <img
            src={imageSrc}
            alt="Image 180 x 180"
            className="cursor-pointer max-w-full max-h-full"
            style={{
              maxHeight: "180px",
              maxWidth: "180px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// interface uploadImageProps {
//   getimage: Staff;
//   setIsSuccess: Dispatch<SetStateAction<any>>;
// }

// export default function UploadImage({
//   getimage,
//   setIsSuccess,
// }: uploadImageProps) {
//   const refImage = useRef(getimage.StaffImage);
//   const [imageSrc, setImageSrc] = useState<any>();

//   const handleImageClick = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/jpg";
//     input.addEventListener("change", (event: any) => {
//       const file = (event.target as HTMLInputElement).files?.[0];
//       if (file) {
//         displayImage(file);
//       }
//     });
//     input.click();
//   };

//   const displayImage = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImageSrc(e.target?.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files?.[0];
//     if (file) {
//       displayImage(file);
//     }
//   };

//   async function submitImage() {
//     console.log(refImage.current);
//     const url = `/staff/${imageSrc.id}`;
//     const method = "POST";
//     const body = {
//       StaffImage: refImage.current,
//     };
//     const request = provideRequestOptions(url, method, JSON.stringify(body));

//     try {
//       fetch(request).then((res) => {
//         {
//           res.json();
//           setIsSuccess(res.ok);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }

//     return (
//       <div>
//         <div
//           className="border-2 border-dashed p-8 text-center cursor-pointer"
//           onClick={() => {
//             handleImageClick();
//             submitImage();
//           }}
//           onDrop={() => {
//             handleDrop;
//             submitImage();
//           }}
//           onDragOver={(e) => e.preventDefault()}
//         >
//           <div>
//             {imageSrc?.map((getimage: Staff) => (
//               <img
//                 key={getimage.StaffImage}
//                 src={`http://192.168.10.31:5000/file/image/${getimage.StaffImage}`}
//                 alt={`${getimage.StaffName}`}
//                 className="cursor-pointer max-w-full max-h-full"
//                 style={{
//                   maxHeight: "180px",
//                   maxWidth: "180px",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
