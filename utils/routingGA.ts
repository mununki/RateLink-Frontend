export const trackPageView = (url: string) => {
  console.log("tracking");
  try {
    window.gtag("config", `"${process.env.GA_USERID}"`, {
      page_location: url
    });
    console.log("try");
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
};
