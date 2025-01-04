import { Footer, FooterCopyright } from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer container>
      <FooterCopyright
        by="Wealth Manager. All rights reserved."
        year={new Date().getFullYear()}
      />
    </Footer>
  );
};

export default FooterComponent;
