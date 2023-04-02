import { ethers } from "ethers";
const Buy = (state) => {

    const sendmessage = async (event) => {
        event.preventDefault(); 
        const {contract} = state;
        //fetch the value in name and message using querySelector
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        const value={value:ethers.utils.parseEther("0.001")}
        const transaction = await contract.setmessage(name, message,value);
        await transaction.wait();
        console.log("Transaction is done");


    }

    return (
        <>
        <h1>Enter The Details</h1>
            <form action="" onSubmit={sendmessage}>
                <label htmlFor="">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter Your Name" />
                < label htmlFor="">Message</label>
                <input type="text" name="message" id="message" placeholder="Enter Your Message" />
                < button type="submit" >Make Transction</button>
            </form>
        </>
    )
}
export default Buy;