# Agent Instructions: XBRL B7 Waste Information Card Component

## GOAL

Generate a React component for XBRL B7 waste disclosure that conditionally renders the waste code selector based on whether the company generates only household waste.

---

## TASK

Create a card-based UI component with:
1. A conditional question: "Do you only generate household waste?"
2. A toggle/checkbox with default value = **TRUE** (yes, household waste only)
3. If user selects **NO** → Render the WasteCodeSelector component
4. If user selects **YES** → Skip waste information, auto-populate with household waste code (20 03 01)

--- data of EWC codes is here C:\Users\Hp\Desktop\Work\VSME\tc-vsme\src\data\EWC.ts

### WasteCodeSelector component

1. a select box where user can select options and here options will be label which will come from EWC label of this search box will be Select chapter
2. another search box containing subcatagories of main chapter will dynamically change on base of chapter selected in option 1. options of this search box will come subcategories of main chapter 
3. another section containing all the codes selected in opt 1 and opt 2
4. pattern of each code will be like this "code - type - description" at end of line a select box
5. a dynamic table containing 5 cols type of waste , unit, Waste diverted to recycle or reuse, Waste directed to disposal, total waste
6. Type of waste wwill be name of waste "code - type - description", unit can be kg, metric tons or cubic meter  , remaining will be of type number 4th one will be plus of 2nd and 3rd 

8. as user will select codes it will auto adds new rows into table

9. as user will submit form values of table will be saved in array of objects each object will contain name, unit, wasteDivertedToRecycle, wasteDirectedToDisposal and total for each row

10. update schema of B7 as well


### UPDATE

 # chapter

 a search box width will be same as parent card's just some left and right padding.
 options box will also have same width

 # subcategory

  a search box width will be same as parent card's just some left and right padding.
 options box will also have same width

# select codes

a section where width will be same as card's just some padding left and right
will have fixed height of 500px a scroller depend on content every option in this will have select box
