## Cap Table Utility

This is a utility that takes in a CSV file with investor information and aggregates it into a JSON object that is representative of a Cap Table.

## Assumptions

- CSV is comma delimited columns and new line for delimiting rows
- CSV contains all headers listed in the example and they are the following strings:

    #INVESTMENT DATE,
    SHARES PURCHASED,
    CASH PAID,
    INVESTOR

- Desired output is to standard output
- Testing/Grading will occur on a Mac/Linux based system.  This was developed on a Mac and due to the differences between line returns on the Mac/Windowns Platforms (e.g. <LF> vs. <CR> + <LF> ), this program may behave differently on a windows based system

## Dependencies

 Mocha 6.2.0
 NPM 5.6.0
 Node v8.9.4

## Installation

You'll need to get node for mac if it's not already installed.  You can find the relevant binaries here:

https://nodejs.org/en/download/

after that install mocha globally with `npm install -g mocha`

## Usage

Use command line arguments to invoke the method:

`node index <path_to_test_file> YYYY-MM-DD`

will invoke the script. The date is optional and the program will use the current date if a date is omitted or formatted incorrectly.

## Test Files

A test file exist in the test directory.  `test_file1.txt` is a replica of the homework assignment input.

## Run

To run against the homework assignment input enter `node index.js ./test/test_file1.txt`

## Testing

To run unit tests run `npm test`

Note: you may need to install Mocha, but it should run using the local installation provided with the node modules

## Design concepts

Generally, speaking one of the larger challenges I've observed with coding is maintenance.  In this case, there were possibly more efficient ways to write the code and it could have been less verbose, but I opted to error on the side of explicit and longer variable names and more of them to make it clear what's happening as opposed to minimizing the actual number of lines or algorithm optimization.  Hence, components are generally broken down into the smallest unit of functionality and then imported into the index file and run systematically.  

I have a preference to not altering global objects, so while it incurs a larger memory cost, the thought is from a functional programming mindset that it's wiser to pass--for example--an array into a function, clone the objects within the array and push them on to a new array, then return the new array where this is practical.  Even those this incurs extra compute and memory cost it prevents state problems when programs get larger.
