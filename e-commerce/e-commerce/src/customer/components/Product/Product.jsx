"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { filters, singleFilter } from "./FilterData";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import { findProducts } from "../../../state/Product/Action";

const sortOptions = [
  { name: "Price: Low to High", value: "price_low" },
  { name: "Price: High to Low", value: "price_high" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorvalue = searchParams.get("color");
  const sizevalue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const disccount = searchParams.get("disccount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");

  console.log("pages:", product.products?.totalPages);

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    console.log(searchParams, value);
    navigate({ search: `?${query}` });
  };

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue = filterValue.length > 0 ? filterValue[0].split(",") : [];
      filterValue.push(value);
    }

    if (filterValue.length) {
      searchParams.set(sectionId, filterValue.join(","));
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    console.log("params:", param);
    if (!param.lavelThree) return;

    const [minPrice, maxPrice] =
      priceValue === null ? [0, 10000] : priceValue.split("-").map(Number);

    const data = {
      category: param.lavelThree,
      colors: colorvalue ? [colorvalue] : [],
      sizes: sizevalue ? [sizevalue] : [],
      minPrice,
      maxPrice,
      minDiscount: disccount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 4,
      stock: stock || "",
    };

    dispatch(findProducts(data));
  }, [
    param.lavelThree,
    colorvalue,
    sizevalue,
    priceValue,
    disccount,
    sortValue,
    pageNumber,
    stock,
    dispatch,
  ]);

  console.log("in products.jsx", product);

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>

                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                defaultValue={option.value}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              />
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Main content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>
          <div className="flex items-center">
            {/* Sort Menu */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <span className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
                        {option.name}
                      </span>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            {/* Grid & Filter buttons */}
            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        {/* Product section */}
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            {/* Filters (Desktop) */}
            <div>
              <form className="hidden lg:block">
                <div className="py-10 flex justify-between items-center">
                  <h1 className="text-lg opacity-50 font-bold">Filters</h1>
                  <FilterListIcon />
                </div>

                {/* Multi-select filters */}
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  onChange={() =>
                                    handleFilter(option.value, section.id)
                                  }
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600"
                                />
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                {/* Single-select filters */}
                {singleFilter.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <FormLabel
                            sx={{ color: "black" }}
                            className="text-gray-900"
                            id="demo-radio-buttons-group-label"
                          >
                            {section.name}
                          </FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="female"
                              name="radio-buttons-group"
                            >
                              {section.options.map((option) => (
                                <FormControlLabel
                                  key={option.value}
                                  onChange={(e) =>
                                    handleRadioFilterChange(e, section.id)
                                  }
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </DisclosurePanel>
                    </>
                  </Disclosure>
                ))}
              </form>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-4 w-full">
              <div className="flex flex-wrap justify-center bg-white py-5">
                {product.products &&
                  product.products?.content?.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="w-full">
          <div className="px-4 py-5 flex justify-center">
            <Pagination
              count={product.products?.totalPages}
              color="secondary"
              onChange={handlePaginationChange}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
