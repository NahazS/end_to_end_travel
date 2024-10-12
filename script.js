// set a global one ticket price variable 
let one_t_price;

// Make a onclick function when any one click the destination button then the seat select section open....
// And ticket Route, Boarding Point, Dropping Point, ticket price show in ticket section

// 1st get the element of destination form inputs 
const destination = document.getElementById('destination');
const destination_from = document.getElementById('destination_from');
const destination_to = document.getElementById('destination_to');
const destination_btn = document.getElementById('destination_btn');

// Now add a onclick even listener in destination_btn 
destination_btn.addEventListener('click', function()
{
    // 1st write a if else condition if destination_from and destination_to value same then the ticket section element not updated and seat select section not open
    if(destination_from.value != destination_to.value)
    {
        // update the ticket route boarding point dropping point(for ticket price i write a different if else condition cause different destination different price) and display the seat select section
        // 1st get the element of ticket route, boarding point, dropping point
        const route_from = document.getElementById('route_from');
        const route_to = document.getElementById('route_to');
        const boarding_point = document.getElementById('boarding_point');
        const dropping_point = document.getElementById('dropping_point');

        // Now set the inner text of ticket all element
        route_from.innerText = destination_from.value;
        route_to.innerText = destination_to.value;
        boarding_point.innerText = destination_from.value;
        dropping_point.innerText = destination_to.value

        // show the seat select section
        const seat_select = document.getElementById('seat_select');
        seat_select.style.display = 'flex';

        // ticket price set for different destination
        if (
            ((destination_from.value === "Dhaka" || destination_from.value === "Chattogram") && (destination_to.value === "Dhaka" || destination_to.value === "Chattogram")) ||
            ((destination_from.value === "Dhaka" || destination_from.value === "Sylhet") && (destination_to.value === "Sylhet" || destination_to.value === "Dhaka"))
        ) {
            one_t_price = 700;
        } else if (
            ((destination_from.value === "Rajshahi" || destination_from.value === "Chattogram") && (destination_to.value === "Chattogram" || destination_to.value === "Rajshahi")) ||
            ((destination_from.value === "Khulna" || destination_from.value === "Chattogram") && (destination_to.value === "Chattogram" || destination_to.value === "Khulna")) ||
            ((destination_from.value === "Barisal" || destination_from.value === "Chattogram") && (destination_to.value === "Barisal" || destination_to.value === "Chattogram"))
        ) {
            one_t_price = 1200;
        } else{
            one_t_price = 600;
        }

        // show the one ticket price in ticket section
        const one_ticket_price = document.getElementById('one_ticket_price');
        one_ticket_price.innerText = one_t_price + "Taka";

        console.log(destination_from.value);
        console.log(destination_to.value);

    } else
    {
        alert("plz select different value for the from destination and the to destination");
        window.location.href='#destination';
    }
    
})

// Now write a function for the seat section(for every seat) if any one click on any seat number then the seat background color change and add the seat number seat class seat price in the right side in seat select section(total price section) and update the total price and grand total
// In this function i will continue update the seat number select total price and the grand total price so i declare seatArray seat_cls seat_price grand_price global variable
const total_price_show = document.getElementById('total_price_show');
const grand_total_show = document.getElementById('grand_total_show');

let total_cost = 0;
let seat_array = [];
let seat_cls = [];
let seat_price = [];
let grand_price;
let max_seat = 0; // js line 77
function seat(number){

    // get the seat 
    const seat_number = document.getElementById(number);
    // Now write a if else condition so that user not allowed to select more then 4 seat.
    // And when user select any seat then the seat color change and add seat select section and update the total price and the grand total price
    // for that set a global max seat variable
    if(max_seat < 4){
        if(seat_number.style.background === 'rgb(29, 209, 0)')
        {   
            // deselect seat
            seat_number.style.background = '';
            max_seat --;
            // remove the seat number in seat_array, price in seat_price, cls in seat_cls
            seat_cls.pop();
            seat_price.pop();
            // find the particular seat index and remove the particular seat from the seat_array
            const index = seat_array.indexOf(seat_number.innerText);
            if(index > -1)
                seat_array.splice(index, 1);
            // update the total cost
            total_cost = total_cost - one_t_price;
            
        } else{
            // select seat
            seat_number.style.background = '#1DD100';
            max_seat ++;
            // add the seat number in seat_array, price in seat_price, cls in seat_cls
            seat_array.push(seat_number.innerText);
            seat_cls.push("Economy");
            seat_price.push(one_t_price);
            // update the total cost
            total_cost = total_cost + one_t_price;

        }
    } else if (max_seat >= 4)
    {
        if(seat_number.style.background === 'rgb(29, 209, 0)')
        {   
            // deselect seat
            seat_number.style.background = '';
            max_seat --;
            // remove the seat number in seat_array, price in seat_price, cls in seat_cls
            seat_cls.pop();
            seat_price.pop();
            // find the particular seat index and remove the particular seat from the seat_array
            const index = seat_array.indexOf(seat_number.innerText);
            if(index > -1)
                seat_array.splice(index, 1);
            // update the total cost
            total_cost = total_cost - one_t_price;

        }else
        {
            alert('you can select 4 seat only');
        }
    }
    // show the total price section
    // get the element first
    const seat_no_show = document.getElementById('seat_no_show');
    const seat_cls_show = document.getElementById('seat_cls_show');
    const seat_price_show = document.getElementById('seat_price_show');

    // show
    seat_no_show.innerText = seat_array.join('\n');
    seat_cls_show.innerText = seat_cls.join('\n');
    seat_price_show.innerText = seat_price.join('\n');
    total_price_show.innerText = total_cost;
    grand_total_show.innerText = total_cost;
    // for coupon section
    grand_price = total_cost;

    // first hide the destination section if user select any seat
    max_seat;
    const destination = document.getElementById('destination');
    if(max_seat>0)
        destination.style.display = 'none';
    else{

        // if user deselect all the ticket then show the destination select from if the user want to change the destination 
        // reset the coupon section also
        destination.style.display = 'flex';
        window.location.href='#destination';
        coupon.value = '';
        coupon_apply.style.background = '';
        coupon_apply.disabled = false;
        alert("you can select your destination again if you want");
    }
}

// add a even listener for apply coupon button and check the coupon in valid or not valid and update the grand price

// get the element first
const coupon = document.getElementById('coupon');
const coupon_apply = document.getElementById('coupon_apply');
const invalid_coupon = document.getElementById('invalid_coupon');

coupon_apply.addEventListener('click', function(){
    if(coupon.value === "NEW15")
    {  
        // disable the coupon apply button if user use coupon one time
        coupon_apply.style.background = '#81cb76';   
        coupon_apply.disabled = true;
        // update the grand total price after using coupon
        let coupon_price = grand_price - Math.floor(grand_price * .15);
        grand_total_show.innerText = coupon_price;
        invalid_coupon.innerText = "";
    } else if(coupon.value === "Couple 20" && max_seat >= 2)
    {
        // disable the coupon apply button if user use coupon one time
        coupon_apply.style.background = '#81cb76';   
        coupon_apply.disabled = true;
        // update the grand total price after using coupon
        let coupon_price = grand_price - Math.floor(grand_price * .20);
        grand_total_show.innerText = coupon_price;
        invalid_coupon.innerText = "";
    } else{
        invalid_coupon.innerText = "please enter a valid coupon code";
    }
})