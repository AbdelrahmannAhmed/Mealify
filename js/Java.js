$(function loading(){
    $('#loading').fadeOut(1000,function () {
        $('body').css('overflow',"auto")
    })

})
function openSideNav() {
    $("#navBar").animate({
        left: 0
    }, 500)

    for (let i = 0; i < 5; i++) {
        $("#listItems li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeSideNav() {
    let boxWidth = $("#sliderMenu").width()
    $("#navBar").animate({
        left: -boxWidth
    }, 500)

    $("#listItems li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$("#btnSlider").on('click', function () {
    if ($("#navBar").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})



async function getData() {

    var Data1 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=American`)
    var response1 = await Data1.json()

    showMeals(response1)
    openMeal(response1)
}
getData()

function showMeals(response1) {
    cartona = ``
    $('#loading').show()

    for (let index = 0; index < response1.meals.length; index++) {
        cartona +=
            `
        <div class="col-md-3 position-relative"  id="${response1.meals[index].idMeal}" >
          <div class="overflow-hidden position-relative mealA" >
               <img src="${response1.meals[index].strMealThumb}" " class="w-100 rounded-3" alt="">
               <div class="layer position-absolute d-flex align-items-center rounded-3"  >
                  <h3 class="ms-1">${response1.meals[index].strMeal}</h3>
                </div>  
          </div>

        </div>
        
     `
    }
    $('#loading').fadeOut(1000)

    $('#demo').html(cartona)
}

function openMeal(response1) {
    for (let index = 0; index < response1.meals.length; index++) {
        $(`#${response1.meals[index].idMeal}`).on('click', function () {
            x = this.getAttribute("id")
            getData2(x)

        })
    }
}
async function getData2(x) {
    $('#loading').show()

    var Data2 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`)
    response2 = await Data2.json()
    showMealDetails(response2)


}


function showMealDetails(response2) {
    cartona = `  <div class="col-md-4">
<img src="${response2.meals[0].strMealThumb}" class="w-100 rounded-3" alt="">
<h2>${response2.meals[0].strMeal}</h2>
</div>
<div class="col-md-8 text-white">
<h2>Instructions</h2>
<p>${response2.meals[0].strInstructions}</p>
<h3>Area : ${response2.meals[0].strArea}</h3>
<h3>Category : ${response2.meals[0].strCategory}</h3>
<h3>Recipes :</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure1} ${response2.meals[0].strIngredient1}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure2}  ${response2.meals[0].strIngredient2}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure3}  ${response2.meals[0].strIngredient3}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure4}   ${response2.meals[0].strIngredient4}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure5}  ${response2.meals[0].strIngredient5}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure6}  ${response2.meals[0].strIngredient6}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure7}  ${response2.meals[0].strIngredient7}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure8}  ${response2.meals[0].strIngredient8}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure9}  ${response2.meals[0].strIngredient9}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure10} ${response2.meals[0].strIngredient10}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure11}  ${response2.meals[0].strIngredient11}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure12} ${response2.meals[0].strIngredient12}</li>
    <li class="alert alert-info m-2 p-1">${response2.meals[0].strMeasure13}  ${response2.meals[0].strIngredient13}</li>
</ul>
<h3>tags</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">

    <li class="alert alert-danger m-2 p-1">${response2.meals[0].strTags}</li>
</ul>
<a target="_blank" href="${response2.meals[0].strSource}" class="btn btn-success">Source</a>
<a target="_blank" href="${response2.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>


</div>`
$('#loading').fadeOut(1000)

    $('#demo').html(cartona)
}


$('#search').on('click', function () {
    $("#btnSlider").click();
    var cartona = ''
    cartona += `<div class="offset-md-2"></div>
    <div class="col-md-4"><input type="text" id="byName" class="form-control bg-transparent text-white PHcolor"
            placeholder="Search By Name .."></div>
    <div class="col-md-4"><input type="text" id="byFirstLetter" class="form-control bg-transparent text-white PHcolor"
            placeholder="Search By First Letter .."></div>
    <div class="offset-md-2"></div>
    <div class="row mt-5 gy-4 text-white " id="demo2">
    `
    
    $('#demo').html(cartona)
    
    searchByName()
    searchByLetter()
})

function searchByName() {
    $("#byName").on("keyup", async function () {
        $('#loading').show()
        x = $("#byName").val()
        var Data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
        var response = await Data.json()
        console.log(response);
        var cartona = ''
        for (let index = 0; index < response.meals.length; index++) {


            cartona += `
            <div class="col-md-3 position-relative"  id="${response.meals[index].idMeal}" >
                <div class="overflow-hidden position-relative mealA" >
                     <img src="${response.meals[index].strMealThumb}"  class="w-100 rounded-3" alt="">
                     <div class="layer position-absolute d-flex align-items-center rounded-3"  >
                        <h3 class="ms-1">${response.meals[index].strMeal}</h3>
                      </div>  
                </div>
              </div>`

        } 
        $('#loading').fadeOut(1000)

        $('#demo2').html(cartona)
        for (let index = 0; index < response.meals.length; index++) {
            $(`#${response.meals[index].idMeal}`).on('click', function () {
                getData2(response.meals[index].idMeal)

            })
        }

    });

}
function searchByLetter() {
    $("#byFirstLetter").on("keyup", async function () {
        $('#loading').show()

        x = $("#byFirstLetter").val()
        var Data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`)
        var response = await Data.json()
        console.log(response);
        var cartona = ''
        for (let index = 0; index < response.meals.length; index++) {


            cartona += `
            <div class="col-md-3 position-relative"  id="${response.meals[index].idMeal}" >
                <div class="overflow-hidden position-relative mealA" >
                     <img src="${response.meals[index].strMealThumb}"  class="w-100 rounded-3" alt="">
                     <div class="layer position-absolute d-flex align-items-center rounded-3"  >
                        <h3 class="ms-1">${response.meals[index].strMeal}</h3>
                      </div>  
                </div>
              </div>`

        }
        $('#loading').fadeOut(1000)

        $('#demo2').html(cartona)
        for (let index = 0; index < response.meals.length; index++) {
            $(`#${response.meals[index].idMeal}`).on('click', function () {
                getData2(response.meals[index].idMeal)

            })
        }

    });

}

$('#area').on('click', async function () {
    $('#loading').show()
    var Data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await Data.json()
    cartona = ''
    for (let index = 0; index < response.meals.length; index++) {
        cartona += `  <div  class="col-md-3 d-flex flex-column align-items-center"><i><i id="${response.meals[index].strArea}" class="fa-solid fa-house-laptop areaIcon"></i></i>
        <h2>${response.meals[index].strArea}</h2>
          </div>`



    }
    $('#loading').fadeOut(1000)
    $('#demo').html(cartona)

    for (let index = 0; index < response.meals.length; index++) {
        $(`#${response.meals[index].strArea}`).on('click', function () {
            getDataArea(response.meals[index].strArea)
        })
    }
    closeSideNav()

})

async function getDataArea(x) {

    var Data1 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
    var response1 = await Data1.json()

    showMeals(response1)
    openMeal(response1)
}

$('#Categories').on('click', async function () {
    $('#loading').show()
    var Data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await Data.json()
    console.log(response);
    cartona = ''
    for (let index = 0; index < response.categories.length; index++) {
        cartona += `  <div class="col-md-3 position-relative"  id="${response.categories[index].idCategory}" >
        <div class="overflow-hidden position-relative mealA" >
             <img src="${response.categories[index].strCategoryThumb}" " class="w-100 rounded-3" alt="">
             <div class="layer position-absolute d-flex align-items-center rounded-3"  >
                <h3 class="ms-1">${response.categories[index].strCategory}</h3>
              </div>  
        </div>
      </div>
      `
    }
    $('#loading').fadeOut(1000)

    $('#demo').html(cartona)

    for (let index = 0; index < response.categories.length; index++) {
        $(`#${response.categories[index].idCategory}`).on('click', function () {
            getDataCategories(response.categories[index].strCategory)
        })
    }
    closeSideNav()

})

async function getDataCategories(x) {
    $('#loading').show()

    var Data1 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`)
    var response1 = await Data1.json()
    $('#loading').fadeOut(1000)

    showMeals(response1)
    openMeal(response1)
}

$('#Ingredients').on('click', async function () {
    $('#loading').show()

    var Data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await Data.json()
    cartona = ''
    for (let index = 0; index <= 20; index++) {
        cartona += `<div  class="col-md-3 d-flex flex-column align-items-center"><i><i id="${response.meals[index].idIngredient}" class="fa-solid fa-drumstick-bite areaIcon"></i></i>
        <h2>${response.meals[index].strIngredient}</h2>
          </div>
      `
    }
    $('#loading').fadeOut(1000)

    $('#demo').html(cartona)

    for (let index = 0; index <= 20; index++) {
        $(`#${response.meals[index].idIngredient}`).on('click', function () {
            // console.log(response.meals[index].strIngredient);
            getDataIngredients(response.meals[index].strIngredient)
        })
    }
    closeSideNav()

})

async function getDataIngredients(x) {
    $('#loading').show()
    var Data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
    var response = await Data.json()
    $('#loading').fadeOut(1000)
    showMeals(response)
    openMeal(response)


}


$('#ContactUs').on('click', function () {
    $('#loading').show()
    closeSideNav()
    cartona = ''
    cartona += `
    <div class="col-md-6">
                <input id="nameInput"  type="text" class="form-control"
                    placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control "
                    placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  type="text" class="form-control "
                    placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control "
                    placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput"  type="password" class="form-control "
                    placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput"  type="password" class="form-control "
                    placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword
                </div>
            </div>
            <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    `
    $('#loading').fadeOut(1000)

    $('#demo').html(cartona)
    nameValidation()
    emailValidation()
    phoneValidation()
    ageValidation()
    passwordValidation()
    repasswordValidation()
})
function validationBtn() {
    if ($("#nameAlert").hasClass("d-none") &&
        $("#phoneAlert").hasClass("d-none") &&
        $("#ageAlert").hasClass("d-none") &&
        $("#passwordAlert").hasClass("d-none") &&
        $("#emailAlert").hasClass("d-none") &&
        $("#repasswordAlert").hasClass("d-none")) {
        document.getElementById('submitBtn').removeAttribute("disabled")
        console.log(2);
    } else {
        console.log(1);
        document.getElementById('submitBtn').setAttribute("disabled", true)
    }
}
function nameValidation() {
    $('#nameInput').on('keyup', function () {
        var regex = /^[a-zA-Z ]+$/
        if (regex.test($('#nameInput').val())) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    })
}
function emailValidation() {
    $('#emailInput').on('keyup', function () {
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (regex.test($('#emailInput').val())) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
           
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }

    })
}
function phoneValidation() {
    $('#phoneInput').on('keyup', function () {
        var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        if (regex.test($('#phoneInput').val())) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
    })
}
function ageValidation() {
    $('#ageInput').on('keyup', function () {
        var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
        if (regex.test($('#ageInput').val())) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    })
}
function passwordValidation() {
    $('#passwordInput').on('keyup', function () {
        var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        if (regex.test($('#passwordInput').val())) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        }
    })
}
function repasswordValidation() {
    $('#repasswordInput').on('keyup', function () {
        if ($("#repasswordInput").val() == $("#passwordInput").val()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
            validationBtn()
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }
    })
}

