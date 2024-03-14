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
        <div className='flex w-full'>
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
      </div>


    </div>
  )
}

export default SS04form;
