export const mappedAriaRolesToContextRoles = {
  row: ["rowgroup", "grid", "table", "treegrid"],
  rowgroup: ["table", "grid", "treegrid"],
  gridcell: ["row"],
  cell: ["row"],
  columnheader: ["row"],
  rowheader: ["row"],
  tab: ["tablist"],
  treeitem: ["tree", "group"],
  listitem: ["list"],
  caption: ["table", "grid", "treegrid", "figure"],
  menuitem: ["menu", "menubar", "group"],
  menuitemcheckbox: ["menu", "menubar", "group"],
  menuitemradio: ["menu", "menubar", "group"],
  option: ["listbox", "group"],
};
