var fs = require('fs');

module.exports = {
  BaseTemplate : function(list, description) {
    return `
      <!doctype html>
      <html>
      <head>
      <title>Board</title>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="/static/stylesheets/style.css"/>
      </head>
      <body>
      <header>
        <div class="mainpage">
          <div class="main"><h1><a href="/">생각 조각 모음</a></h1></div>
          <div class="createfolder"><a href="/CreateFolder">폴더 생성</a></div>
          <div class="deletefolder"><a href="/DeleteFolder">폴더 삭제</a></div>
        </div>
      </header>
      <nav>
      </nav>
      <section>
          <div class="list">
          <h2><a href="/writeform">업로드</a></h2>
          ${list}
          </div>
          <div class="order">
            ${description}
          </div>
      </section>
      <footer>KwonJuYoung 2018</footer>
      </body>
      </html>
    `;
  },

  BoardTemplate : function(list, title, author, description) {
      return `
      <!doctype html>
      <html>
      <head>
        <title>Board</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="/static/stylesheets/style.css"/>
      </head>
      <body>
        <header>
          <div class="mainpage">
            <div class="main"><h1><a href="/">생각 조각 모음</a></h1></div>
            <div class="createfolder"><a href="/CreateFolder">폴더생성</a></div>
            <div class="deletefolder"><a href="/DeleteFolder">폴더 삭제</a></div>
          </div>
        </header>
        <nav>
        </nav>
        <section>
          <div class="list">
            <h2><a href="/writeform">업로드</a></h2>
            ${list}
          </div>
          <div class="order">
            <div class="text">
              <div class="title_author">
                <h2 class="title">${title}</h2>
                <h4 class="author">${author}</h4>
              </div>
              <div class="descriptions">
                ${description}
              </div>
            </div>
          </div>
        </section>
        <footer>KwonJuYoung 2018</footer>
      </body>
      </html>
      `;
    },

  Multiupload : function(folder) {
    return `
      <form action="/upload_process" method="post" enctype="multipart/form-data">
        <p>제목</p><textarea id="title" name="title"></textarea>
        <p>작성자</p><textarea id="author" name="author"></textarea>
        <p>게시판 선택</p>
        <select id="board" name="board">
          ${folder}
        </select>
        <p>내용</p><textarea id="description" name="description"></textarea>
        <p>파일 업로드</p>
        <p><input id="file" type="file" name="upload_Files" multiple="multiple"></p>        
        <br><input type="submit" value="작성">
      </form>`;
  },

  createdfolder : function() {
    return `
      <form action="/created_folder_process" method="post">
        <p>생성할 폴더명을 입력해 주세요</p>
        <input type="text" name="foldername">
        <input type="submit" value="생성">
      </form>`;
  },

  deletedfolder : function() {
    return `
      <form action="/deleted_folder_process" method="post">
        <p>삭제할 폴더명을 입력해 주세요</p>
        <p>폴더가 비어있을 경우 삭제가 진행됩니다.</p>
        <input type="text" name="foldername">
        <input type="submit" value="삭제">
      </form>`;
  },

  // deletefolder : function() {
  //   return `
  //     <form action="/delete_folder_process" method="post">
  //       <input type="text" name="foldername">
  //       <input type="submit" value="생성">
  //     </form>`;
  // },


  board : function() {
    return `
      <h2 class="title">${title}</h2>
      <h4 class="author">${author}</h4>
      <p class="description">${description}</p>`;
  },

  mainpage : function(filelist) {
    return `
    <div class="image"></div>
    <div class="maintext"><p>자신의 생각을 마음껏 전달하세요!</p></div>
    `;
  },

  folder : function(folder) {
    var list = "";

    for (var property in folder) {
      list = list + `<option value="${folder[property]}">${folder[property]}</option>`;
    }
    return list;
  },

  folderList : function (filelist) {
    var list = '<ul>';
    for (var property in filelist) {
      list = list + `<li><a href="/${filelist[property]}">${filelist[property]}</a></li>`;
    }
    list = list+'</ul>';
    return list;
  }, 

  BoardList : function (filelist, temp) {
    var list = '<div class="BoardList">';
    list = list + '<div class="Lists"><div>제목</div><div>글쓴이</div><div>삭제</div></div>';
    for (var property in filelist) {
      var temptext = filelist[property].split('-');
      list = list + `
        <div class="List">
          <div><a href="/${temp}/${filelist[property]}">${temptext[1]}</a></div>
          <div>${temptext[2]}</div>
          <div>
            <form action="/delete_process" method="post">
              <input type="hidden" name="path" value="${temp}">
              <input type="hidden" name="filename" value="${filelist[property]}">
              <input type="submit" value="삭제">
            </form>
          </div>
        </div>
      `;
    }
    return list;
  }
}


