import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useState } from "react";
import styles from "./BrandList.module.scss";
import { blandListType } from "../../api/ebay/type";

export type BrandListProps = {
  brands: blandListType[];
  selectedBrandId?: number;
  onSelectBrand: (brandId: number) => void;
  onAddBrand: (brandName: string) => void;
};

export const BrandList = ({
  brands,
  selectedBrandId,
  onSelectBrand,
  onAddBrand,
}: BrandListProps) => {
  const [isBlandInputFormOpen, setIsBlandInputFormOpen] = useState(false);
  const [addedBlandName, setAddedBlandName] = useState("");

  const handleSaveBrand = () => {
    setIsBlandInputFormOpen(false);
    onAddBrand(addedBlandName);
    setAddedBlandName("");
  };

  return (
    <Card className={styles.listCard}>
      <CardBody className="d-flex flex-column justify-content-between">
        <div className={styles.listCardBody}>
          <CardTitle tag="h5">Bland List</CardTitle>
          <ListGroup>
            {brands.length > 0 ? (
              brands.map((item) => (
                <ListGroupItem
                  key={item.id}
                  className={`list-group-item-action action ${
                    styles.listGroupItem
                  } ${selectedBrandId === item.id ? styles.selected : ""}`}
                  href="#pablo"
                  tag={"a"}
                  onClick={() => onSelectBrand(item.id)}
                >
                  {item.blandName}
                </ListGroupItem>
              ))
            ) : (
              <></>
            )}
            {isBlandInputFormOpen ? (
              <Input
                type="text"
                className={styles.blandInput}
                placeholder="Input Bland Name"
                onChange={(e) => setAddedBlandName(e.target.value)}
                value={addedBlandName}
              />
            ) : (
              <></>
            )}
          </ListGroup>
        </div>
        <div className="d-flex justify-content-end column-gap-2">
          <div className="align-self-right">
            {isBlandInputFormOpen ? (
              <Button
                onClick={() => {
                  setIsBlandInputFormOpen(false);
                  setAddedBlandName("");
                }}
              >
                <i className="fas fa-times" />
                Cancel
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="align-self-end">
            {isBlandInputFormOpen ? (
              <Button
                onClick={handleSaveBrand}
                disabled={addedBlandName === ""}
              >
                <i className="fas fa-times" />
                Save
              </Button>
            ) : (
              <Button onClick={() => setIsBlandInputFormOpen(true)}>
                <i className="fas fa-plus" />
                Add Bland
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
