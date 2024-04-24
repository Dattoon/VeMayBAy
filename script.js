/*Bài tập 1: hàm tìm kiếm trên header tất cả các trang*/
function checkKeySearch(e)
{
	var key = event.which ||event.keyCode;
	if (key ==32){
     doSearch();
	}	
}
function doSearch()
{
	var frm=document.forms["frm-search"];
	if(frm.words.value.length>0)
		frm.submit();  
}
//Bài tập 2: xác thực dữ liệu trang html5
//trang Đăng Nhập
function frmValidate5(frm)
{
	return frm.checkValidity();
}
//Bài tập 2: xác thực dữ liệu tất cả trình duyệt

//trang Đăng Nhập
function loginValidate(frm)
{
	var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if ( emailReg.test(frm.email.value) == false ) {
		alert("Vui lòng nhập email hợp lệ.");
		frm.email.focus();
		return false;
		}
	if ( frm.psw.value.length<8 ) {
		alert("Mật khẩu có tối thiểu 8 ký tự.");
		frm.psw.focus();
		return false;
		}
	alert("Đã gửi dữ liệu Đăng nhập");
	return true;
}
//trang Đăng Ký
function registerValidate(frm)
{
	var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if ( emailReg.test(frm.email.value) == false ) {
		alert("Vui lòng nhập email hợp lệ.");
		frm.email.focus();
		return false;
		}
	if ( frm.psw.value.length<8 ) {
		alert("Mật khẩu có tối thiểu 8 ký tự.");
		frm.psw.focus();
		return false;
		}
	if ( frm.psw2.value.length<8 ) {
		alert("Mật khẩu có tối thiểu 8 ký tự.");
		frm.psw2.focus();
		return false;
		}
	if ( frm.psw.value.length!= frm.psw2.value.length) {
		alert("Mật khẩu và Nhập lại mật khẩu phải giống nhau.");
		frm.psw.focus();
		return false;
		}
	alert("Đã gửi dữ liệu Đăng ký.");
	return true;
}
//trang Liên hệ
function contactValidate(frm)
{
	var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if ( frm.name.value.length<4 ) {
		alert("Vui lòng nhập Tên của bạn.");
		frm.name.focus();
		return false;
		}
	if ( emailReg.test(frm.email.value) == false ) {
		alert("Vui lòng nhập email hợp lệ.");
		frm.email.focus();
		return false;
		}
	if ( frm.message.value.length<10 ) {
		alert("Nội dung cần liên hệ quá ngắn, vui lòng từ 10 ký tự trở lên.");
		frm.message.focus();
		return false;
		}	
	alert("Đã gửi dữ liệu Liên hệ.");
	return true;
}
////////////////////
var itemList={  "sp001":{"name":"Thành Phố Hồ Chí Minh Đến Đà Nẵng","price":3600000,"photo":"images/vemaybay/danang.jpg"},
                "sp002":{"name":"Thành Phố Hồ Chí Minh Đến Hà Nội","price":3100000,"photo":"images/vemaybay/hanoi.jpg"},
                "sp003":{"name":"hành Phố Hồ Chí Minh Đến Phú Quốc","price":2500000,"photo":"images/vemaybay/phuquoc.jpg"},
                "sp004":{"name":"Đà Nẵng Đến Thành Phố Hồ Chí Minh","price":2300000,"photo":"images/vemaybay/hcm.jpg"},
                "sp005":{"name":"Đà Nẵng Đến Hà Nội ","price":2800000,"photo":"images/vemaybay/hanoi.jpg"},
                "sp006":{"name":"Hà Nội Đến Thành Phố Hồ Chí Minh","price":3000000,"photo":"images/vemaybay/hcm.jpg"},
                "sp007":{"name":"Hà Nội Đến Đà Nẵng ","price":2300000,"photo":"images/vemaybay/danang.jpg"},
                "sp008":{"name":"Phú Quốc Đến Thành Phố Hồ Chí Minh","price":2500000,"photo":"images/vemaybay/hcm.jpg"},
                "sp009":{"name":"Phú Quốc Đến Hà Nội","price":3700000,"photo":"images/vemaybay/hanoi.jpg"},
               };

/*Hàm thêm sản phẩm vào Giỏ hàng**/
function addCart(code)
{
	var number=1; // Số lượng sản phẩm mặc định khi nhấn "Đặt ngay"
	var name=document.querySelector(`button[onclick="addCart('${code}')"]`).parentNode.parentNode.querySelector('.ProductCard_title__Qzx4a').textContent;
	if(number==0)return;
	if(typeof localStorage[code] === "undefined"){
		window.localStorage.setItem(code,number);
	}else{
	   var current=parseInt(window.localStorage.getItem(code));
	   if(current+number>100)
	   {
			window.localStorage.setItem(code,100);
			alert("Mỗi mặt hàng chỉ có thể đặt 100 sản phẩm cho mỗi đơn hàng. Bạn đã đặt 100 sản phẩm của "+name+" này.");
			return;		   
	   }
	   else			   
			window.localStorage.setItem(code,current+number);	   
	}
	alert("Đã cập nhật sản phẩm "+name+" với số lượng "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+parseInt(window.localStorage.getItem(code))+" sản phẩm.");	
}


/*Hàm mở trang Giỏ hàng**/
function openCart()
{
	window.location.href = "donhang.html";
}
// Hàm trả về tỉ lệ giảm giá đơn hàng khi đặt hàng
// Nếu đặt hàng từ thứ 2 đến thứ 4 và trong khoảng thời gian từ 7h00-11h00 và 13h00 đến 17h00
// Quy ra số phút trong ngày thì ta có các giá trị tương đương như sau:
//  7h00 =  7 x 60 = 420 phút
// 11h00 = 11 x 60 = 660 phút
// 13h00 = 13 x 60 = 7800 phút
// 17h00 = 17 x 60 = 1020 phút
function getDiscountRate()
{
	var d=new Date();//lấy ngày hiện tại của máy tính
	var weekday=d.getDay();//lấy ngày trong tuần	
	var totalMins=d.getHours()*60+d.getMinutes();//đổi thời gian hiện tại ra số phút trong ngày
	if(weekday>=1&&weekday<=3&&((totalMins>=420&&totalMins<=660)||(totalMins>=780&&totalMins<=1020)))
		return 0.1;
	return 0;
}
//hàm hiển thị nội dung giỏ hàng
function showCart()
{
var formatter = new Intl.NumberFormat('vi-VN', {
	style: 'currency',
	currency: 'VND'
	});
	var container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
	container.innerHTML="";

	var sum=0;//tổng mỗi mặt hàng
	var totalPreTax=0;//tổng trước thuế
	var discountRate=getDiscountRate();//tỉ lệ khuyến mãi
	var taxRate=0.1;//tỉ lệ thuế	
	var discount=0;//tiền giảm giá
	var tax=0;//tiền thuế
	for(var i=0;i<window.localStorage.length;i++)
	{
	 if(typeof itemList[localStorage.key(i)] === "undefined")
		continue;		
	 var tr=document.createElement("tr");
	 var photoCell=document.createElement("td");
	 var nameCell=document.createElement("td");
	 var priceCell=document.createElement("td");
	 var numberCell=document.createElement("td");
	 var sumCell=document.createElement("td");
	 var removeCell=document.createElement("td");
	 var removeLink=document.createElement("a");
	 
	 var item=itemList[localStorage.key(i)];
	 var number=localStorage.getItem(localStorage.key(i));
	 
	 photoCell.style.textAlign="center";
	 photoCell.innerHTML="<img src='"+item.photo+"' class='round-figure' width='100px'/>";
	 
	 nameCell.innerHTML=item.name;
	 priceCell.innerHTML=formatter.format(item.price);
	 priceCell.style.textAlign="right";
	 
	 numberCell.innerHTML=number;
	 numberCell.style.textAlign="right";
	 
	 sum=number*item.price;	 
	 sumCell.innerHTML=formatter.format(sum);
	 sumCell.style.textAlign="right";
	 
	 removeLink.innerHTML="<i class='fa fa-trash icon-pink'></i>";
	 
	 removeLink.setAttribute("href","#");
	 removeLink.setAttribute("data-code",localStorage.key(i));
	 removeLink.onclick=function(){
		removeCart(this.dataset.code);
		 };
	 removeCell.style.textAlign="center";
	 removeCell.appendChild(removeLink);
	 
	 tr.appendChild(photoCell);
	 tr.appendChild(nameCell);
	 tr.appendChild(numberCell);
	 tr.appendChild(priceCell);	 
	 tr.appendChild(sumCell);
	 tr.appendChild(removeCell);
	 container.appendChild(tr);
	 totalPreTax+=sum;	 
	}
	var discount=totalPreTax*discountRate;
	var tax=(totalPreTax-discount)*taxRate;
	document.getElementById("bill_pre_tax_total").innerHTML=formatter.format(totalPreTax);	
	document.getElementById("bill_discount").innerHTML=discountRate+" x A = "+formatter.format(discount);		
	document.getElementById("bill_tax").innerHTML=formatter.format(tax);	
	document.getElementById("bill_total").innerHTML=formatter.format(totalPreTax-discount+tax);
	
}
/*Hàm xóa sản phẩm khỏi đơn hàng**/
function removeCart(code)
{		
	if(typeof window.localStorage[code] !== "undefined")
		{
		//xóa sản phẩm khỏi localStorage
		window.localStorage.removeItem(code);
		//Xóa nội dung của phần thân của bảng (<tbody>)
		document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
		//Hiển thị lại nội dung của đơn hàng
		showCart();
		}	
}
/*Hàm hiển thị nội dung keyword trong trang timkiem.html**/
function showSearch()
{
	var url = new URL(window.location);
	var ws = url.searchParams.get("words");
	document.getElementById("searchDetail").innerHTML="<h1>Từ khóa tìm kiếm</h1> <b>"+ws+"</b>";
}
//Cập nhật trang chi tiết đơn hàng khi cập nhật số lượng sản phẩm
window.onstorage = () => {
  showCart();
};

//
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].classList.add("active");
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}
