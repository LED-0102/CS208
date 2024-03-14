import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Navbar/Header';
import { Input } from "@nextui-org/react";


const SS04form = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div></div>
      <div className='ml-56 border-4 border-yellow-300 h-full'>
        <form>
          <div className='flex w-full p-4 border-4 border-red-300'>
            <div className='w-2/3'>hi</div>
            <div>
              <div className=' border-2 border-black'>
                <div className='flex-col p-4'>
                  <h2>FORM NO:SS04</h2>
                  {/* <div>
              <label for="StoreNo">Store Number/IN/IV/DP/NO. : </label>
              <input type="text" id="StoreNo" name="StoreNo" className='border-2 border-black'/>
              </div>
              <div>
              <label for="financialyear">Financial year : </label>
              <input type="number" id="financialyear" name="financialyear" class="border-2 border-black"/>
              </div> */}
                  <table>
                    <tr>
                      <td>
                        <label for="StoreNo">Store Number/IN/IV/DP/NO. : </label>
                      </td>
                      <td>
                        <input type="text" id="StoreNo" name="StoreNo" class="border-2 border-black" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="financialyear">Financial year : </label>
                      </td>
                      <td>
                        <input type="number" id="financialyear" name="financialyear" class="border-2 border-black" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="reqdate">Date : </label>
                      </td>
                      <td>
                        <input type="date" id="reqdate" name="reqdate" class="border-2 border-black" />
                      </td>
                    </tr>
                  </table>
                  <p>(to be filled by store assistant)</p>
                </div>
              </div>

            </div>
          </div>
          <div className=' w-full px-4 py-2  border-4 border-red-300'>
            <span className='flex justify'>
              <span className='mx-auto  border-4 border-green-100'>(To be prepared in duplicate. One copy will be forwarded to Finance, and one held with Store Office.)</span>
            </span>
            {/* <div className='flex w-full px-4 py-2  border-4 border-red-300'> */}
            <div className='flex w-full px-4 py-2  '>
              <div className='flex-col w-1/2 px-12'>
                <p>
                  <span className='font-bold'>Name of custodian of assets :</span>
                  <span>Dr. Nisheeth K. Prasad</span>
                </p>
                <p>
                  <span className='font-bold'>Department/Project No. :</span>
                  <span>MEMS</span>
                </p>
                <p>
                  <span className='font-bold'>Location :</span>
                  <span>POD 1D</span>
                </p>
                <p>
                  <span className='font-bold'>Contact No :</span>
                  <span>#3175</span>
                </p>
                <p><span className='font-bold'>Item Receiving Date: </span> 15 October 2023</p>
              </div>
              <div className='flex-col w-1/2 px-12'>
                <p>
                  <span className='font-bold'>Designation :</span>
                  <span>Asst. Prof.</span>
                </p>
                <p>
                  <label for="inventoryNo">Inventory No : </label>
                  <input type="number" id="inventoryNo" name="inventoryNo" class="border-2 border-black" />
                </p>
                <p>
                  <span className='font-bold'>Room No :</span>
                  <span>205B</span>
                </p>
                <p>
                  <span className='font-bold'>Email id :</span>
                  <span><a href="mailto:nisheeth@iiti.ac.in ?body=My custom mail body">nisheeth@iiti.ac.in </a></span>
                </p>
               
              </div>
            </div>
            <span className='flex justify'>
            <span  className='mx-auto  border-4 border-green-100'>If Item purchased under buy-back (No) & Item purchase information GeM Contract No.: DP</span>
           
            </span>
            
          </div>
        </form>
      </div>




    </div>
  )
}

export default SS04form;
