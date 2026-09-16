### GOAL

goal of this is to implement a feature in b5 forms to get information about bio diversity sesnsitive area from undertaking.

### TASK 

Add another card labeled as Land information (optional) 

this card will contain four input boxes total sealed area, total nature orientated area on-site, total nature orientated area off-site and total land used unit will be m^2 there will be two fields in each line and for small devices there will be one this card has no condition


update svchema and respected places as well

### DONE

if you look into this file C:\Users\Hp\Desktop\Work\VSME\tc-vsme\src\components\forms\b5-biodiversity-form.tsx you will find a prop called properties from that prop we will build some fields.

this prop has properties called city, country , streetAddress along with some other properties.

1- if hasSensitiveBiodiversityAreas is true then those fields will show there will be input box labeled as site location that will be auto filled with "country city streetAddress" then other field called area in m^2 this field will empty then on next line we will have two switch first will site located in bio diversity sensitive area? switch button next will be site located near bio diversity sensitive area? switch button

all these fields will be contained inside card and for sm devices each line will contain one field 

currently we have three fields named as totalAreaHectares,protectedAreaHectares, nonProtectedAreaHectares reove those and instead of those add above fields .

number of cards will be decided on base of length of properties prop

update b5-schema and all other respective place accordingly.