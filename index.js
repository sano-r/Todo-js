// css読み込み
import './style.css';

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById('add-text').value;
  document.getElementById('add-text').value = '';

  createIncompleteTodo(inputText);
};

// 渡された引数をもとに未完了のTodoを作成する関数
const createIncompleteTodo = (todo) => {
  // li生成
  const li = document.createElement('li');

  // div生成
  const div = document.createElement('div');
  div.className = 'list-item';

  // p生成
  const p = document.createElement('p');
  p.className = 'todo-item';
  p.innerText = todo;

  // 完了ボタン
  const buttonComplete = document.createElement('button');
  buttonComplete.innerText = '完了';
  buttonComplete.addEventListener('click', () => {
    // 押された完了ボタンの親にあるliタグは以下の完了ボタンと削除ボタンを削除
    const moveTarget = buttonComplete.closest('li');
    // html上完了ボタンの下にある要素(削除ボタン)を削除する
    buttonComplete.nextElementSibling.remove();
    // 完了ボタン自体も削除
    buttonComplete.remove();

    // 戻すボタン
    const backButton = document.createElement('button');
    backButton.innerText = '戻す';
    moveTarget.firstElementChild.appendChild(backButton);
    document.getElementById('complete-list').appendChild(moveTarget);

    // 戻すボタンの動作はここで定義
    backButton.addEventListener('click', () => {
      // todoの内容を戻すボタンの左にあるpタグからcreateIncompletetodo()を呼ぶ
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      const deleteTarget = backButton.closest('li');
      document.getElementById('complete-list').removeChild(deleteTarget);
    });
  });

  // 削除ボタン
  const buttonDelete = document.createElement('button');
  buttonDelete.innerText = '削除';
  buttonDelete.addEventListener('click', () => {
    // 押された削除ボタンの親にあるliタグを未完了リストから削除
    // closest()一番近い引数に一致するタグを取ってくる
    const deleteTarget = buttonDelete.closest('li');
    // 削除はremoveChild()
    document.getElementById('incomplete-list').removeChild(deleteTarget);
  });

  // 階層構造
  div.appendChild(p);
  div.appendChild(buttonComplete);
  div.appendChild(buttonDelete);
  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById('incomplete-list').appendChild(li);
};

// add-button
document.getElementById('add-button').addEventListener('click', onClickAdd);
