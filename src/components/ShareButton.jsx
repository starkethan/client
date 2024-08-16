import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const notify = () =>
  toast("Copied to clipboard", {
    duration: 1000,
    position: "top-center",
    style: { background: "#007FFF", color: "white", width: "200px" },
  });

export const ShareButton = ({ post }) => {
  const currentPageUrl = `/p/${post}`;
  const handleShare = () => {
    navigator.clipboard.writeText(currentPageUrl);
    notify();
  };

  return (
    <div>
      <Popup
      
        contentStyle={{
          width: "300px",
          marginTop: "120px",
          background: "transparent",
          border: "none"
        }}
        trigger={
          <button title="Share">
            {" "}
            <svg
              className="mt-1 dark:fill-white active:opacity-50"
              fill="#262626"
              height="24"
              viewBox="0 0 48 48"
              width="24"
            >
              <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
            </svg>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="dark:border border-black-50 rounded-xl">
            <div className="dark:bg-black bg-white rounded-t-xl dark:text-white border-b border-black-50 p-2">
              <span
                className="fixed  flex flex-row p-2 -mt-2 dark:text-white hover:bg-red-600"
                onClick={() => close()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <center>
                {" "}
                <p className="font-semibold">Share</p>
              </center>
            </div>
            <div className="flex flex-col p-2 rounded-b-xl bg-white dark:bg-black dark:text-white" onClick={close}>
              <FacebookShareButton url={currentPageUrl}>
                <div className="flex flex-row p-1 rounded-2xl dark:hover:bg-gray-800 hover:bg-slate-200">
                  <FacebookIcon size={40} round={true} />
                  <p className="mt-2 ml-6">Share to Facebook</p>{" "}
                </div>
              </FacebookShareButton>

              <WhatsappShareButton url={currentPageUrl}>
                <div className="flex flex-row p-1 rounded-2xl dark:hover:bg-gray-800 hover:bg-slate-200">
                  <WhatsappIcon size={40} round={true} />
                  <p className="mt-2 ml-6">Share to WhatsApp</p>
                </div>
              </WhatsappShareButton>

              <TwitterShareButton url={currentPageUrl}>
                <div className="flex flex-row p-1 rounded-2xl dark:hover:bg-gray-800 hover:bg-slate-200">
                  <TwitterIcon size={40} round={true} />
                  <p className="mt-2 ml-6"> Share to Twitter (X)</p>
                </div>
              </TwitterShareButton>

              <TelegramShareButton url={currentPageUrl}>
                <div className="flex flex-row p-1 rounded-2xl dark:hover:bg-gray-800 hover:bg-slate-200">
                  <TelegramIcon size={40} round={true} />
                  <p className="mt-2 ml-6">Share to Telegram</p>
                </div>
              </TelegramShareButton>

              <RedditShareButton url={currentPageUrl}>
                <div className="flex flex-row p-1 rounded-2xl dark:hover:bg-gray-800 hover:bg-slate-200">
                  <RedditIcon size={40} round={true} />
                  <p className="mt-2 ml-6"> Share to Reddit </p>
                </div>
              </RedditShareButton>

              <EmailShareButton url={currentPageUrl}>
                <div className="flex flex-row p-1 rounded-2xl dark:hover:bg-gray-800 hover:bg-slate-200">
                  <EmailIcon size={40} round={true} />
                  <p className="mt-2 ml-6">Share via Email</p>
                </div>
              </EmailShareButton>

              <button onClick={handleShare}>
                <div className="flex flex-row p-3 rounded-2xl dark:hover:bg-gray-800 hover:bg-slate-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  <p className=" ml-9">Copy link</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </Popup>
      <Toaster />
    </div>
  );
};
