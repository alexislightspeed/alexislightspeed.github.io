# Imports Palette & Components

# Palette
{
	Color,
	Spacing,
	Type,
	Radius,
	Shadow,
	Icon
} = require "cirrusPalette"

# Components
{
	Avatar,
	Button,
	Card,
	Label,
	Form,
	Switch
} = require "cirrusComponents"

# Enter Prototype information here
# Setup the information shown when sharing this prototype
Framer.Info =
	title: "Prototype name"
	author: "Lightspeed POS"
	twitter: "@lightspeedhq"
	description: ""

# Use desktop cursor
document.body.style.cursor = "auto"

# Change the background color
Screen.backgroundColor = Color.snow200

# Changes standard animation duration
Framer.Defaults.Animation =
	time: 0.35
# Start working below this line.

c = new Card
	x: Align.center
	y: Align.center
	height: 150

sw1 = new Switch
	parent: c
	x: Spacing 2
	y: Spacing 2
	isOn: true

sw1v = new Type.body
	parent: c
	y: sw1.y + sw1.height - 22
	x: sw1.maxX + Spacing 2
	text: "Switch 1 value"

sw2 = new Switch
	parent: c
	x: Spacing 2
	y: sw1.maxY + Spacing 2

sw2v = new Type.body
	parent: c
	y: sw2.y + sw2.height - 22
	x: sw2.maxX + Spacing 2
	text: "Switch 2 value"

set = new Button.primary
	parent: c
	x: Spacing 2
	y: sw2.maxY + Spacing 4
	fill: true
	text: "Swap"

get = new Button.secondary
	parent: c
	y: set.y
	x: set.maxX + Spacing 2
	text: "Get"

set.onClick ->
	sw1.checked = !sw1.isOn
	sw2.isOn = !sw2.isOn

get.onClick ->
	sw1v.text = sw1.isOn
	sw2v.text = sw2.checked