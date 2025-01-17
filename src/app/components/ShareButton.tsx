import { Popover } from "antd";
import {
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import styled from "styled-components";
import { useState } from "react";

const ShareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
`;

const ShareContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #262626;
  color: #ffffff;
`;

const CloseButton = styled.span`
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  &:hover {
    opacity: 0.7;
  }
`;

const ShareIcon = styled.svg`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledPopover = styled(Popover)`
  && {
    :where(.css-dev-only-do-not-override-nqoqt9).ant-popover .ant-popover-inner,
    :where(.css-dev-only-do-not-override-nqoqt9).ant-popover .ant-popover-content,
    :where(.css-dev-only-do-not-override-nqoqt9).ant-popover .ant-popover-inner-content {
      background-color: #262626 !important;
      border: 1px solid #262626 !important;
      box-shadow: none !important;
    }

    .ant-popover-arrow {
      display: none;
    }

    .ant-popover-inner-content {
      background-color: #262626;
      color: #ffffff;
      padding: 0;
    }

    .ant-popover-title {
      background-color: #262626;
      color: #ffffff;
      border-bottom: 1px solid #333;
    }
  }
`;

const CopyContainer = styled.div`
  width: 100%;
  padding: 12px;
  background-color: #262626;
  border-top: 1px solid #333;
`;

const CopyButton = styled.button`
  width: 100%;
  padding: 8px;
  background: #434343;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover {
    opacity: 0.8;
  }
`;

const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #262626;
  color: #ffffff;
  border-bottom: 1px solid #333;
  margin-bottom: -12px;
`;


const ShareButton = ({ musicLink = "" }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const content = (
    <ShareWrapper>
      <ShareContainer>
        <FacebookShareButton url={musicLink}>
          <FacebookIcon size={60} round />
        </FacebookShareButton>

        <FacebookMessengerShareButton url={musicLink} appId="516770441382332">
          <FacebookMessengerIcon size={60} round />
        </FacebookMessengerShareButton>

        <TelegramShareButton url={musicLink}>
          <TelegramIcon size={60} round />
        </TelegramShareButton>

        <TwitterShareButton url={musicLink}>
          <TwitterIcon size={60} round />
        </TwitterShareButton>
      </ShareContainer>
      <CopyContainer>
        <CopyButton onClick={handleCopyLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          {copied ? 'Copied!' : 'Copy Link'}
        </CopyButton>
      </CopyContainer>
    </ShareWrapper>
  );

  const title = (
    <PopoverHeader>
      <span>Share</span>
      <CloseButton onClick={() => setOpen(false)}>X</CloseButton>
    </PopoverHeader>
  );

  return (
    <StyledPopover
      content={content}
      title={title}
      trigger="click"
      placement="top"
      open={open}
      onOpenChange={setOpen}
      arrow={false}
    >
      <ShareIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        fill="currentColor"
      >
        <line
          x1="8"
          y1="12"
          x2="16"
          y2="6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="8"
          y1="12"
          x2="16"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="16" cy="6" r="3" fill="currentColor" />
        <circle cx="16" cy="18" r="3" fill="currentColor" />
        <circle cx="8" cy="12" r="3" fill="currentColor" />
      </ShareIcon>
    </StyledPopover>
  );
};

export default ShareButton;
