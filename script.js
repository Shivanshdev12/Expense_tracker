const submitItem = document.getElementById("submit");

window.addEventListener("DOMContentLoaded", (e) => {
  Object.keys(localStorage).forEach((key) => {
    if (key) {
      let stringified = localStorage.getItem(key);
      //data is obtained in the form of string
      addtoList(JSON.parse(stringified), key);
    }
  });
});

submitItem.addEventListener("click", () => {
  const amt = document.getElementById("amount").value;
  const desc = document.getElementById("description").value;
  const type = document.getElementById("category").value;
  const obj = {
    amt,
    desc,
    type,
  };
  let key = "desc" + Math.ceil(Math.random() * obj.amt);
  localStorage.setItem(key, JSON.stringify(obj));
  addtoList(obj, key);
});

function addtoList(obj, key) {
  const ul = document.getElementById("items");
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(
      `Amount : ${obj.amt}, Description : ${obj.desc}, Category : ${obj.type}`
    )
  );
  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  editBtn.addEventListener("click", () => {
    document.getElementById("amount").value = obj.amt;
    document.getElementById("description").value = obj.desc;
    document.getElementById("category").value = obj.type;
    li.remove();
    localStorage.removeItem(key);
  });
  li.append(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  li.addEventListener("click", () => {
    li.remove();
    localStorage.removeItem(key);
  });
  li.append(deleteBtn);

  ul.appendChild(li);
}
