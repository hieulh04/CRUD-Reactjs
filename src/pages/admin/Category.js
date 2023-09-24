import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  findAll,
  deleteById,
  create,
  update,
  findCategoryById,
} from "../../services/CategoryService.js";
import { Button } from "react-bootstrap";
function GetData() {
  const [data, setData] = useState([]);

  const emptyCategory = {
    name: "",
    status: 1,
  };
  const [category, setCategory] = useState(emptyCategory);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await findAll();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa danh mục này?"
      );

      if (confirmDelete) {
        await deleteById(id);
        loadData();
        console.log(`Danh mục với id ${id} đã bị xóa.`);
      } else {
        console.log("Hủy bỏ xóa danh mục.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xóa danh mục:", error);
    }
  };

  const save = async () => {
    try {
      const response = await create(category);
      const dataNew = response.data;
      const dataOld = [...data];
      dataOld.push(dataNew);
      setData(dataOld);
      console.log(`Danh mục đã được lưu: ${response.data}`);
      console.log(data);
      return response.data;
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lưu danh mục:", error);
    }
  };
  const editCategory = (category) => {
    setCategory({ ...category });
  };
  const findIndexById = async (id) => {
    const response = await findCategoryById(id);
    const data = response.data;
    console.log("find", data, "index");
  };

  const updateData = async () => {
    try {
      const id = category.id;
      const response = await update(category, id);
      const dataNew = response.data;
      const dataOld = [...data];
      const index = findIndexById(id);
      dataOld[index] = dataNew;
      setData(dataOld);
      loadData();
    } catch (error) {
      console.error("Đã xảy ra lỗi khi sửa danh mục:", error);
    }
  };

  return (
    <div>
      <section>
        <div>
          <label>Name</label>
          <input
            id="name"
            type="text"
            value={category.name}
            onChange={(e) => {
              const val = e.target.value || "";
              const a = { ...category };
              a.name = val;
              setCategory(a);
            }}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            id="status"
            type="number"
            value={category.status}
            onChange={(e) => {
              const val = e.target.value;
              const a = { ...category };
              a.status = val;
              setCategory(a);
            }}
          />
        </div>
        <button onClick={save}>Add</button>
        <button
          onClick={() => {
            updateData(category.id);
          }}
        >
          Sửa
        </button>
      </section>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {data &&
          data.map((data, index) => (
            <tbody key={data.id}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>
                  {data.status === "1" || data.status === 1 ? "Còn" : "Hết"}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteData(data.id);
                    }}
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() => {
                      editCategory(data);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
}
export default GetData;
