"use client";
import React, { useState } from "react";
import data from "./constitutiondata";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import ChatComponent from "@/components/samvidhan/Constitution/ChatComponent";

export default function page() {
  //   const [openPartitions, setOpenPartitions] = useState({});
  //   const [openSubPartitions, setOpenSubPartitions] = useState({}); // State for sub-partition collapsibles
  const initialOpenPartitions = {};
  const initialOpenSubPartitions = {};

  // Initialize open state for all partitions and sub-partitions
  data.forEach((part) => {
    initialOpenPartitions[part.partition_number] = true; // Open all main partitions
    part.sub_partitions?.forEach((sub) => {
      initialOpenSubPartitions[sub.partition_id] = true; // Open all sub-partitions
    });
  });

  const [openPartitions, setOpenPartitions] = useState(initialOpenPartitions);
  const [openSubPartitions, setOpenSubPartitions] = useState(
    initialOpenSubPartitions
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [articleId, setArticleId] = useState("");
  const handleArticleClick = (id) => {
    setArticleId(id);
  };
  const ELEMENTS = data.map(part => ({
	id: part.partition_number, // Use partition_number as the id
	isSelectable: false, // Set to false for folders
	name: part.partition_title,
	children: part.sub_partitions?.map(sub => ({
	  id: sub.partition_id, // Use partition_id as the id for sub-partitions
	  isSelectable: false, // Set to false for folders
	  name: sub.partition_number + '' + sub.partition_title,
	//   children: sub.sub_partitions?.map(subPart => ({
	// 	id: subPart.partition_id, // Use partition_id as the id for sub-sub-partitions
	// 	isSelectable: true, // Set to true for files
	// 	name: subPart.partition_title,
	//   })) || [],
	})) || [],
  }));

  return (
    <div className="flex p-10">
      <div className={`w-3/12`}>
        <div className="">
          {/* <span
            className=" text-black text-4xl cursor-pointer"
            onClick={toggleSidebar}
          >
            ☰
          </span> */}
		  {isSidebarOpen && (
  <div className="fixed w-80 overflow-y-auto rounded-lg">
    <div className="text-gray-100 text-xl">
      <h1 className="font-bold text-gray-800 text-[15px] ml-3">Constitution</h1>
      <span className="bi bi-x cursor-pointer ml-28 lg:hidden right-0" onClick={toggleSidebar}>X</span>
    </div>
    <div className="overflow-y-scroll h-[90vh] my-3 text-black text-wrap">
	<Tree
  className="p-2 overflow-hidden rounded-md bg-background truncate"
  initialSelectedId={articleId} // Set the selected article ID
  initialExpandedItems={data.map(part => part.partition_number)} // Expand all partitions initially
  elements={ELEMENTS} // Use the ELEMENTS structure
>
  {data.map((part) => (
    <Folder className='truncate' key={part.partition_number} value={part.partition_number} element={part.partition_title}>
      {part.sub_partitions?.map((sub) => (
        <Folder key={sub.partition_id} value={sub.partition_id} element={sub.partition_title}>
          {sub.sub_partitions ? sub.sub_partitions?.map((subPart) => (
            <File key={subPart.partition_id} value={subPart.partition_id}>
              <p onClick={() => handleArticleClick(subPart.partition_id)}>
                {subPart.partition_number} {subPart.partition_title}
              </p>
            </File>
          )): <File key={sub.partition_id} value={sub.partition_id}>
		  <p onClick={() => handleArticleClick(sub.partition_id)}>
			{sub.partition_number} {sub.partition_title}
		  </p>
		</File>}
        </Folder>
      ))}
    </Folder>
  ))}
</Tree>
    </div>
  </div>
)}
          {/* {isSidebarOpen && (
            <div className=" fixed top-0 bottom-0 p-2 w-80 overflow-y-auto  bg-gray-900">
              <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex items-center">

                  <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                    Constitution
                  </h1>
                  <span
                    className="bi bi-x cursor-pointer ml-28 lg:hidden right-0"
                    onClick={toggleSidebar}
                  >
                    X
                  </span>
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
              </div>
              <div className="overflow-y-scroll h-[90vh] my-3 text-white text-wrap">
                {data?.map((part) => {
                  const isOpen = openPartitions[part.partition_number] || false;

                  return (
                    <div
                      key={part.partition_number}
                      className="overflow-scroll"
                    >
                      <h1
                        onClick={() =>
                          setOpenPartitions((prev) => ({
                            ...prev,
                            [part.partition_number]: !isOpen,
                          }))
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {part.partition_number} {isOpen ? "▽" : "△"}
                        <p className="ps-2 truncate">{part.partition_title}</p>
                      </h1>
                      {isOpen &&
                        part.sub_partitions?.map((sub) => {
                          const isSubOpen =
                            openSubPartitions[sub.partition_id] || false; 

                          return (
                            <div key={sub.partition_id}>
                              {sub.sub_partitions ? (
                                <>
                                  <h3 className="ps-10">
                                    {sub.partition_title}{" "}
                                    {isSubOpen ? "▼" : "▲"}
                                  </h3>
                                  {sub.sub_partitions?.map((subPart) => {
                                    return (
                                      <>
                                        <p
                                          className="ps-20 truncate"
                                          onClick={() =>
                                            handleArticleClick(
                                              subPart.partition_id
                                            )
                                          }
                                        >
                                          {subPart.partition_number}{" "}
                                          {isSubOpen ? "▼" : "▲"}
                                        </p>
                                        {isSubOpen && (
                                          <>
                                            <p
                                              className="ps-24 truncate"
                                              onClick={() =>
                                                handleArticleClick(
                                                  sub.partition_id
                                                )
                                              }
                                            >
                                              {subPart.partition_title}
                                            </p>
                                          </>
                                        )}
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  <h3
                                    onClick={() =>
                                      setOpenSubPartitions((prev) => ({
                                        ...prev,
                                        [sub.partition_id]: !isSubOpen,
                                      }))
                                    }
                                    className="ps-10 truncate cursor-pointer"
                                  >
                                    {sub.partition_number}{" "}
                                    {isSubOpen ? "▼" : "▲"}
                                  </h3>
                                  {isSubOpen && (
                                    <>
                                      <p
                                        className="ps-20 truncate"
                                        onClick={() =>
                                          handleArticleClick(sub.partition_id)
                                        }
                                      >
                                        {sub.partition_title}
                                      </p>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            </div>
          )} */}
        </div>
      </div>
      <div className="w-7/12 ">
        {/* {data[articleId]} */}
        <div className="my-2 px-4 gap-3">
          <h1 className="text-xl text-center font-bold">
            Article 5. Citizenship at the commencement of the Constitution.  
          </h1>
          <p className="my-2">
		  At the commencement of this Constitution, every person who has his domicile in the territory of India and –
          </p>
          <p className="my-2">
            The Directive Principles of State Policy contained in Part IV of the
            Constitution set out the aims and objectives to be taken up by the
            States in the governance of the country. This novel features of the
            Constitution is borrowed from the Constitution of Ireland which had
            copied it from the Spanish Constitution.
          </p>
		  <ul className="gap-8">
          <li>
		  (a) who was born in the territory of India; or
        </li>
          <li>
		  (b) either of whose parents were born in the territory of India; or
          </li>
          <li>(c) who has been ordinarily resident in the territory of India for not less than five years immediately preceding such commencement, shall be a citizen of India.
          </li>
		  </ul>
        </div>
      </div>
      <div className="w-3/12 ">
        <ChatComponent />
      </div>
    </div>
  );
}

{
  /* <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button variant="outline">
              
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="overflow-scroll h-[60vh] my-3">
              {data?.map((part) => {
                const isOpen = openPartitions[part.partition_number] || false;

                return (
                  <div key={part.partition_number} className="overflow-scroll">
                    <h1
                      onClick={() =>
                        setOpenPartitions((prev) => ({
                          ...prev,
                          [part.partition_number]: !isOpen,
                        }))
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {part.partition_number} {isOpen ? "▽" : "△"}
                      <h2 className="ms-2">{part.partition_title}</h2>
                    </h1>
                    {isOpen &&
                      part.sub_partitions?.map((sub) => {
                        const isSubOpen =
                          openSubPartitions[sub.partition_id] || false; // Get open state for sub-partition

                        return (
                          <div key={sub.partition_id}>
                            <h3
                              onClick={() =>
                                setOpenSubPartitions((prev) => ({
                                  ...prev,
                                  [sub.partition_id]: !isSubOpen,
                                }))
                              }
                              className="ms-10 cursor-pointer"
                            >
                              {sub.partition_number} {isSubOpen ? "▼" : "▲"}
                            </h3>
                            {isSubOpen && (
                              <p
                                className="ms-12"
                                onClick={() =>
                                  handleArticleClick(sub.partition_id)
                                }
                              >
                                {sub.partition_title}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className="my-3">
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet> */
}
