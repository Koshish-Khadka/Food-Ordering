import React from "react";

const Footer = () => {
  return (
    // <footer classNameName="bg-neutral-primary-soft mt-16">
    //   <div classNameName="mx-auto w-full p-4 py-6 lg:py-8">
    //     <div classNameName="md:flex md:justify-between">
    //       <div classNameName="mb-6 md:mb-0">
    //         <a href="https://flowbite.com/" classNameName="flex items-center">
    //           <img
    //             src="https://flowbite.com/docs/images/logo.svg"
    //             classNameName="h-7 me-3"
    //             alt="FlowBite Logo"
    //           />
    //           <span classNameName="text-heading self-center text-2xl font-semibold whitespace-nowrap">
    //             VoogMandu
    //           </span>
    //         </a>
    //       </div>
    //       <div classNameName="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
    //         <div>
    //           <h2 classNameName="mb-6 text-sm font-semibold text-heading uppercase">
    //             Resources
    //           </h2>
    //           <ul classNameName="text-body font-medium">
    //             <li classNameName="mb-4">
    //               <a href="https://flowbite.com/" classNameName="hover:underline">
    //                 Flowbite
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="https://tailwindcss.com/"
    //                 classNameName="hover:underline"
    //               >
    //                 Tailwind CSS
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h2 classNameName="mb-6 text-sm font-semibold text-heading uppercase">
    //             Follow us
    //           </h2>
    //           <ul classNameName="text-body font-medium">
    //             <li classNameName="mb-4">
    //               <a
    //                 href="https://github.com/themesberg/flowbite"
    //                 classNameName="hover:underline "
    //               >
    //                 Github
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="https://discord.gg/4eeurUVvTy"
    //                 classNameName="hover:underline"
    //               >
    //                 Discord
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h2 classNameName="mb-6 text-sm font-semibold text-heading uppercase">
    //             Legal
    //           </h2>
    //           <ul classNameName="text-body font-medium">
    //             <li classNameName="mb-4">
    //               <a href="#" classNameName="hover:underline">
    //                 Privacy Policy
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" classNameName="hover:underline">
    //                 Terms &amp; Conditions
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <hr classNameName="my-6 border-default sm:mx-auto lg:my-8" />
    //     <div classNameName="sm:flex sm:items-center sm:justify-between">
    //       <span classNameName="text-sm text-body sm:text-center">
    //         © 2023{" "}
    //         <a href="https://flowbite.com/" classNameName="hover:underline">
    //           Flowbite™
    //         </a>
    //         . All Rights Reserved.
    //       </span>
    //       <div classNameName="flex mt-4 sm:justify-center sm:mt-0">
    //         <a href="#" classNameName="text-body hover:text-heading">
    //           <svg
    //             classNameName="w-5 h-5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               fill-rule="evenodd"
    //               d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
    //               clip-rule="evenodd"
    //             />
    //           </svg>
    //           <span classNameName="sr-only">Facebook page</span>
    //         </a>
    //         <a href="#" classNameName="text-body hover:text-heading ms-5">
    //           <svg
    //             classNameName="w-5 h-5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
    //           </svg>
    //           <span classNameName="sr-only">Discord community</span>
    //         </a>
    //         <a href="#" classNameName="text-body hover:text-heading ms-5">
    //           <svg
    //             classNameName="w-5 h-5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
    //           </svg>
    //           <span classNameName="sr-only">Twitter page</span>
    //         </a>
    //         <a href="#" classNameName="text-body hover:text-heading ms-5">
    //           <svg
    //             classNameName="w-5 h-5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               fill-rule="evenodd"
    //               d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
    //               clip-rule="evenodd"
    //             />
    //           </svg>
    //           <span classNameName="sr-only">GitHub account</span>
    //         </a>
    //         <a href="#" classNameName="text-body hover:text-heading ms-5">
    //           <svg
    //             classNameName="w-5 h-5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               fill-rule="evenodd"
    //               d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
    //               clip-rule="evenodd"
    //             />
    //           </svg>
    //           <span classNameName="sr-only">Dribbble account</span>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <>
<footer className="px-6 mt-16 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        <div className="sm:col-span-2 lg:col-span-1">
            <a href="https://prebuiltui.com">
                <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.904 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.456.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.868.504 1.988.504M56.95 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.148-1.596 3.444-1.596 1.008 0 1.82.364.812.365 1.512 1.176l-2.016 2.072a2.1 2.1 0 0 0-.812-.56 3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.811-.84 2.548m14.156 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444 0 .336-.056.7a7 7 0 0 1-.112.756H69.23v-2.52h9.436l-1.148 1.008q-.056-1.232-.476-2.072a3 3 0 0 0-1.204-1.288q-.756-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504 1.037 0 1.904-.364a4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.91 0q-1.54 0-2.745-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.821 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.869 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.455.924-3.276.924M82.898 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128.001 1.204.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.87.504 1.988.504m15.067 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.644.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.976-.28V14.56h3.08V28zm1.54-15.904q-.783 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.813 0 1.316.532t.504 1.316q0 .784-.504 1.316t-1.316.532M120.169 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532" fill="#000"/>
                    <path d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585" stroke="#4F39F6" />
                </svg>
            </a>
            <p className="text-sm/7 mt-6">PrebuiltUI is a free and open-source UI component library with over 300+ beautifully crafted, customizable components built with Tailwind CSS.</p>
        </div>
        <div className="flex flex-col lg:items-center lg:justify-center">
            <div className="flex flex-col text-sm space-y-2.5">
                <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                <a className="hover:text-slate-600 transition" href="#">About us</a>
                <a className="hover:text-slate-600 transition" href="#">Careers<span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">We’re hiring!</span></a>
                <a className="hover:text-slate-600 transition" href="#">Contact us</a>
                <a className="hover:text-slate-600 transition" href="#">Privacy policy</a>
            </div>
        </div>
        <div>
            <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
            <div className="text-sm space-y-6 max-w-sm">
                <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-50">
                    <input className="focus:ring-2 bg-white ring-indigo-600 outline-none w-full max-w-64 py-2 rounded px-2" type="email" placeholder="Enter your email"/>
                    <button className="bg-indigo-600 px-4 py-2 text-white rounded">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
    <p className="py-4 text-center border-t mt-6 border-slate-200">
        Copyright 2025 © <a href="https://prebuiltui.com">PrebuiltUI</a> All Right Reserved.
    </p>
</footer>
    </>

  );
};

export default Footer;
