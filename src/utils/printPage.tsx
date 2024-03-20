import jsPDF from "jspdf";
import { Recipe } from "../types/Recipe";

export function printPage(recipe: Recipe) {
    const pdf = new jsPDF();
    let start = 60;
    recipe.ingredients.forEach((ing, i) => {
      pdf.setFontSize(12);
      pdf.text(ing.name, 20, start);
      pdf.text(`${ing.quantity} ${ing.unit}`, 75, start);
      if (ing?.notes) pdf.text(ing.notes, 125, start);
      start = start + 7;
      if (i === recipe.ingredients.length - 1) {
        pdf.line(5, start - 2, 210, start - 2, 'FD');
        start = start + 7;
        pdf.setFontSize(20)
        pdf.text('Instructions', 20, start);
        pdf.setFontSize(10)
        pdf.text(recipe.instructions, 22, start + 10);
        // const instructions = recipe.instructions.split(/\r?\n/);
        // let instruction = ``;
        // if (instructions.length > 1) {
        //   instructions.forEach((inst, i, arr) => {
        //     if (inst === '') return;
        //     instruction += `\t${inst}\n`;
        //     if (arr[i + 1] === '') {
        //       instruction += `\n`;
        //     }
        //   })
        // }
        // ingredients += `\nInstructions\n\npoopgfdssdgfdgsfsdgfgsfdgsdfgfsgfdgfd`;
      }
    });
    const textOptions = {
      align: "center" as "center" | "left" | "right" | "justify" | undefined
    };
    pdf.setFontSize(26);
    pdf.text(`${recipe.recipe.name}`, 105, 15, textOptions, 10);
    pdf.line(5, 25, 210, 25);
    pdf.line(5, 40, 210, 40);
    pdf.line(5, 25, 5, 265);
    pdf.line(210, 25, 210, 265);
    pdf.line(5, 265, 210, 265);
    pdf.setFontSize(14);
    pdf.text(`Yield: ${recipe.recipe.servings}`, 35, 35, textOptions);
    pdf.setFontSize(20);
    pdf.text(`Ingredient`, 30, 50, textOptions);
    pdf.text(`Amount`, 85, 50, textOptions);
    pdf.text(`Special Instructions`, 135, 50, textOptions);
    pdf.setFontSize(16);
    pdf.autoPrint();
    pdf.output('dataurlnewwindow', {
      filename: `${recipe.recipe.name}`
    });
}