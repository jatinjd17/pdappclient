import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

function Categorydropdown({
  navigation,
  category,
  dealtimecat,
  originalviewalldealtime,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(category);
  const [items, setItems] = useState([
    { label: "All Categories", value: "" },
    { label: "Mobiles", value: "mobiles" },
    { label: "Tablets", value: "tablets" },
    { label: "Laptops", value: "laptops" },

    { label: "Printers", value: "printers" },
    { label: "Data Cards", value: "data-cards" },
    { label: "Hard Disks", value: "external-hard-disks" },
    { label: "Pendrives", value: "pen-drives" },
    { label: "Memory Cards", value: "mobile-memory-cards" },
    { label: "Cameras", value: "cameras" },
    { label: "Televisions", value: "televisions" },
    { label: "Iron", value: "irons" },
    { label: "Vacuum Cleaner", value: "vacuum-cleaners" },
    { label: "Refrigerator", value: "refrigerators" },
    { label: "Washing Machine", value: "washing-machines" },
    { label: "AC", value: "air-conditioners" },
    { label: "Cooler", value: "air-coolers" },
    { label: "Fan", value: "fans" },
    { label: "Oven", value: "oven-toaster-grills" },
    { label: "Microwave", value: "microwave-ovens" },
    { label: "Induction", value: "induction-cooktops" },
    { label: "Electric Cooker", value: "electric-cookers" },
    { label: "Electric Kettle", value: "electric-kettles" },
    { label: "Coffee Maker", value: "coffee-makers" },
    { label: "Toaster", value: "pop-up-toasters" },
    { label: "Sandwich Maker", value: "sandwich-makers" },
    { label: "Water Purifier", value: "water-purifiers" },
    { label: "Mixer Grinder", value: "mixer-juicer-grinders" },
    { label: "Food Processor", value: "food-processors" },
    { label: "Hand Blender", value: "hand-blenders" },
    { label: "Dishwasher", value: "dishwashers" },
    { label: "Water Heater", value: "water-heaters-geysers" },
    { label: "Chimneys", value: "chimneys" },
    { label: "Blood Pressure Monitors", value: "blood-pressure-monitors" },
    { label: "Blood Glucose Monitor", value: "blood-glucose-monitors" },
    { label: "Digital Thermometer", value: "digital-thermometers" },
    { label: "Pulse Oximeter", value: "pulse-oximeters" },
    { label: "Trimmer", value: "trimmers" },
    { label: "Shaver", value: "shavers" },
    { label: "Hair Straightener", value: "hair-straighteners" },
    { label: "Hair Dryer", value: "hair-dryers" },
    { label: "Epilator", value: "epilators" },
    { label: "Hair Curler", value: "hair-curlers" },
    { label: "Hair Styler", value: "hair-stylers" },
    { label: "Men Watches", value: "men-watches" },
    { label: "Women Watches", value: "women-watches" },
    { label: "Smart Watches", value: "smart-watches" },
  ]);
  return (
    <DropDownPicker
      style={open ? { marginBottom: 200 } : {}}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchable={true}
      searchPlaceholder="Search categories"
      autoScroll={true}
      onSelectItem={(item) => {
        console.log(item);

        if (item.value === "") {
          console.log("Triggered");
          navigation.replace("viewall", {
            viewalldealtime: originalviewalldealtime,
            category: item.value,
            dealtimecat: dealtimecat,
            originalviewalldealtime: originalviewalldealtime,
          });
        } else {
          navigation.replace("viewall", {
            viewalldealtime: originalviewalldealtime,
            category: item.value,
            dealtimecat: dealtimecat,
            originalviewalldealtime: originalviewalldealtime,
          });
        }
      }}
    />
  );
}

export default Categorydropdown;
