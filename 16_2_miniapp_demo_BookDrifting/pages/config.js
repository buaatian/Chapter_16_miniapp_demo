/**api链接 */
const apiUrl = "https://api.douban.com/v2/book/";
//
module.exports = {
  getBookById: apiUrl,
  searchBook: apiUrl + "search",
  getBookList: apiUrl + "series/:id/books",
  baiduAK: '7VENmCeC4aaAfx3CKbSjT1K3oRucOgDK'
}