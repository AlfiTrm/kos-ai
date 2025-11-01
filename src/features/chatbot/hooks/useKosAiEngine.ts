"use client";

import { useKosAIStore } from "@/libs/store";
import {
  useScheduleStore,
} from "@/features/schedules/hooks/useScheduleStore";
import { useStockStore } from "@/features/stock/hooks/useStockStore";
import type { UnitName } from "@/features/stock/types/sTypes";

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const toDateString = (date: Date): string => date.toISOString().split("T")[0];
const getToday = (): string => toDateString(new Date());
const getTomorrow = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toDateString(tomorrow);
};
const getDayAfterTomorrow = (): string => {
  const lusa = new Date();
  lusa.setDate(lusa.getDate() + 2);
  return toDateString(lusa);
};
const monthMap: Record<string, number> = {
  januari: 0, feb: 1, februari: 1, mar: 2, maret: 2, apr: 3, april: 3,
  mei: 4, jun: 5, juni: 5, jul: 6, juli: 6, agu: 7, agustus: 7,
  sep: 8, september: 8, okt: 9, oktober: 9, nov: 10, november: 10,
  des: 11, desember: 11,
};
const getDateFromDay = (day: number): string => {
  const date = new Date();
  date.setDate(day);
  return toDateString(date);
};
const getDateFromDayAndMonth = (day: number, monthName: string): string => {
  const month = monthMap[monthName.toLowerCase()];
  if (month === undefined) {
    return getDateFromDay(day);
  }
  const now = new Date();
  let year = now.getFullYear();
  if (month < now.getMonth()) {
    year += 1;
  }
  const date = new Date(year, month, day);
  return toDateString(date);
};


export function useKosAiEngine() {
  const {
    getTotalBalance,
    getTotalExpense,
    addCustomExpense: addExpense,
    addIncome,
  } = useKosAIStore((s) => s);

  const {
    addTask,
    deleteTask,
    findTask,
    getAllTasks,
  } = useScheduleStore((s) => s);

  const {
    addItem,
    getAllItems,
    findItemByName,
    deleteItem
  } = useStockStore((s) => s);

  const replyEngine = (string: string): string => {
    const t = string.trim().toLowerCase();

    if (/^saldo|sisa/.test(t)) {
      const balance = getTotalBalance();
      const spent = getTotalExpense();
      return `Sisa uang kamu saat ini ${formatIDR(
        balance
      )}. Total pengeluaran tercatat ${formatIDR(spent)}.`;
    }

    const incomeMatch = t.match(
      /^(pemasukan|masuk|dapat uang)\s+([\d\.]+)\s+(.+)/i
    );
    if (incomeMatch) {
      const amt = Number(incomeMatch[2].replace(/\./g, ""));
      const cat = incomeMatch[3].trim();
      if (!amt)
        return "Nominalnya kok aneh, Nak. Coba `masuk 100000 kiriman` ya~";
      addIncome(amt, cat);
      return `Sip, Ibu catat pemasukan ${formatIDR(
        amt
      )} dari **${cat}**. Mantap! 👍`;
    }

    const expenseMatch = t.match(
      /^(pengeluaran|tambah|catat|jajan|beli)\s+([\d\.]+)\s+(.+)/i
    );
    if (expenseMatch) {
      const amt = Number(expenseMatch[2].replace(/\./g, ""));
      const cat = expenseMatch[3].trim();
      if (!amt) return "Nominalnya kok aneh, Nak. Coba `beli 12000 makan` ya~";
      addExpense(amt, cat);
      return `Siap, Ibu catat ${formatIDR(
        amt
      )} buat **${cat}**. Jangan boros ya 😘`;
    }

    const deleteMatch = t.match(/^(hapus tugas|selesai)\s+(.+)/i);
    if (deleteMatch) {
      const fullQuery = deleteMatch[2].trim();
      const dateMatcherMatch = fullQuery.match(
        /(.+?)\s+([\d]{1,2}-[\d]{1,2})$/
      );

      let titleToFind: string;
      let dateMatcher: string | undefined;

      if (dateMatcherMatch) {
        titleToFind = dateMatcherMatch[1].trim();
        dateMatcher = dateMatcherMatch[2].trim();
      } else {
        titleToFind = fullQuery;
        dateMatcher = undefined;
      }

      const task = findTask(titleToFind, dateMatcher);

      if (task) {
        deleteTask(task.id);
        return `Oke, tugas ${task.title} (untuk ${task.date}) sudah Ibu hapus ya.`;
      } else {
        return `Ibu nggak nemu tugas yang judulnya mirip "${fullQuery}", Nak.`;
      }
    }

    if (
      t.startsWith("daftar tugas") ||
      t.startsWith("list task") ||
      t.startsWith("ada tugas apa")
    ) {
      const allTasks = getAllTasks();
      if (allTasks.length === 0) {
        return "Nggak ada tugas yang tercatat, Nak. Santai dulu aja.";
      }

      let response = "Ini daftar tugas kamu, Nak:";
      allTasks.slice(0, 10).forEach((task, index) => {
        response += `\n${index + 1}. ${task.title} (untuk ${task.date})`;
      });
      return response;
    }

    const monthNamesRegex = Object.keys(monthMap).join("|");
    const scheduleRegex = new RegExp(
      `^(ingatkan|jadwalkan|tambah tugas)\\s+(.+?)(?:\\s+(besok|lusa|tanggal \\d{1,2}(?: (?:${monthNamesRegex}))?))?$`,
      "i"
    );
    const scheduleMatch = t.match(scheduleRegex);
    if (scheduleMatch) {
      const title = scheduleMatch[2].trim();
      const dateKeyword = scheduleMatch[3] ? scheduleMatch[3].trim() : null;
      if (!title) return "Mau Ibu ingatkan apa, Nak? Coba `ingatkan cuci baju`";
      let taskDate: string = getToday();
      let dateText: string = "hari ini";
      if (dateKeyword === "besok") {
        taskDate = getTomorrow();
        dateText = "besok";
      } else if (dateKeyword === "lusa") {
        taskDate = getDayAfterTomorrow();
        dateText = "lusa";
      } else if (dateKeyword && dateKeyword.startsWith("tanggal ")) {
        const parts = dateKeyword.split(" ");
        const day = parseInt(parts[1], 10);
        if (parts.length === 3) {
          const monthName = parts[2];
          taskDate = getDateFromDayAndMonth(day, monthName);
          dateText = `tanggal ${day} ${monthName}`;
        } else if (parts.length === 2) {
          taskDate = getDateFromDay(day);
          dateText = `tanggal ${day} bulan ini`;
        }
      }
      addTask({
        title: title,
        date: taskDate,
        priority: "Medium",
        description: "Dicatat via chatbot",
      });
      return `Oke, Ibu jadwalkan ${title} untuk **${dateText}** ya. Jangan lupa dikerjain!`;
    }

    const deleteStockMatch = t.match(/^(hapus stok|habis|buang)\s+(.+)/i);
    if (deleteStockMatch) {
      const nameToFind = deleteStockMatch[2].trim();
      const item = findItemByName(nameToFind);
      if (item) {
        deleteItem(item.id);
        return `Oke, ${item.name} sudah Ibu hapus dari daftar stok.`;
      } else {
        return `Ibu nggak nemu barang yang namanya mirip "${nameToFind}", Nak.`;
      }
    }

    if (
      t.startsWith("daftar stok") ||
      t.startsWith("list stok") ||
      t.startsWith("stok apa aja")
    ) {
      const allItems = getAllItems();
      if (allItems.length === 0) {
        return "Belum ada stok barang yang tercatat, Nak.";
      }
      let response = "Ini daftar stok kamu, Nak:";
      allItems.slice(0, 10).forEach((item, index) => {
        response += `\n${index + 1}. ${item.name} (sisa ${item.leftover}/${
          item.stock
        } ${item.unit})`;
      });
      return response;
    }

    const stockMatch = t.match(
      /^(tambah stok|stok)\s+([\d\.]+)\s+(pcs|kg|g|l|ml)\s+(.+)/i
    );
    if (stockMatch) {
      const amt = Number(stockMatch[2].replace(/\./g, ""));
      const unit = stockMatch[3].trim() as UnitName;
      const name = stockMatch[4].trim();
      if (!amt) return "Jumlah stoknya berapa, Nak? Coba `stok 10 pcs indomie`";
      if (!name) return "Nama barangnya apa, Nak?";
      addItem({ name, icon: "📦", unit, amount: amt });
      return `Sip, Ibu tambahkan ${amt} ${unit} ${name} ke daftar stok.`;
    }

    return "Ibu kurang paham, Nak. Coba bilang:\n`daftar tugas`\n`hapus tugas cuci baju`\n`daftar stok`\n`hapus stok indomie`\n`beli 15000 makan`";
  };
  
  return { replyEngine };
}