// Ensure that the page content is scrolled to the top
function scrollToTopOfPage() {
  $('#ah-site-content').scrollTop(0);
}

FlowRouter.triggers.enter([scrollToTopOfPage]);
