async function searchBooks() {

  const keyword =
    document.getElementById("keyword").value;

  const url =
    `https://apis.data.go.kr/9720000/searchservice/basic?serviceKey=ad45fb2710a84c1d182b19ee083b656290d8d385860bd75c7c1ac35d83ad195c&kwd=${encodeURIComponent(keyword)}`;

  try {

    const response = await fetch(url);

    const text = await response.text();

    document.getElementById("result").innerHTML = text;

  } catch(error) {

    console.error(error);

    alert("오류 발생");
  }
}