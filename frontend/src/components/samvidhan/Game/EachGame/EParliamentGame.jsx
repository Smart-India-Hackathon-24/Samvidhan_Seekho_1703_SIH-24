"use client"
import React from 'react'
import ImageMagnifier from '../ImageMagnifier';

const EParliamentGame = () => {
    const data = [
        {
          aspect: "Learning Roles in Government",
          description: "Students take on roles like Sansad, LOH, LOP, and Judiciary, which teaches them what each part of the government does and how they work together."
        },
        {
          aspect: "Understanding How Laws Are Made",
          description: "By introducing and debating bills, students see firsthand how laws are created and passed, which helps them understand the lawmaking process."
        },
        {
          aspect: "Role of the Judiciary",
          description: "The game shows how the judiciary enforces laws and protects people's rights, helping students understand the importance of courts and justice."
        },
        {
          aspect: "Understanding Democracy",
          description: "Through debates, voting, and question hour, students learn about their rights and responsibilities in a democracy and how citizens can influence decisions."
        },
        {
          aspect: "Values of the Constitution",
          description: "The game encourages students to think about important values like justice, equality, and freedom, which are core to the Constitution."
        }
      ];
      
      // Define the columns
      const columns =[
          {
            Header: "Aspect",
            accessor: "aspect" // accessor is the "key" in the data
          },
          {
            Header: "How It Helps Curb Constitutional Illiteracy",
            accessor: "schoolChildren"
          }
        ]
  return (
    <>
    <h1 className='text-4xl my-5 text-center font-bold'>
        E-Parliment
    </h1>
    <div className='flex gap-4 my-4'>
        <div className=' shadow-lg p-5 rounded-lg   '>
        <ImageMagnifier image={"http://res.cloudinary.com/digqmcuxf/image/upload/v1727097614/mbnrkhkj8hizr0scomkp.png" } />

      {/* <img src="http://res.cloudinary.com/digqmcuxf/image/upload/v1727097614/mbnrkhkj8hizr0scomkp.png" 
      className='h-[70vh] rounded-lg w-[80vw]'
      alt="" /> */}
      </div>
    <table className=''>

        <thead>
        <tr className=' text-3xl'>
        <th colSpan={"3"}>
        Curbing Constitutional illeteracy
        </th>

        </tr>
            <tr className='my-3'>
            {columns.map((e)=>{
                return <th>
                    {e.Header}
                </th>
            })}
            </tr>
        </thead>
        <tbody>
            {
                data?.map((e)=>{
                    return <tr className='gap-4 text-wrap'>
                        <td className='px-1'>
                        {e.aspect}   
                        </td>
                        <td className=''>
                            {e.description}
                        </td>
                    </tr>
                })
            }
        </tbody>
    </table>
        
    </div>
    </>
  )
}

export default EParliamentGame
